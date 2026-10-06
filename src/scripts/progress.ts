import { questions, categories } from '../data/academy';
export type LearningState = { version:1; reviewed:string[]; learned:string[]; difficult:string[]; favorites:string[]; days:string[] };
const key='hexfield.learning.v1';
const validIds=new Set(questions.map(q=>q.id));
const fresh=():LearningState=>({version:1,reviewed:[],learned:[],difficult:[],favorites:[],days:[]});
let state=fresh(),persistent=true;
const clean=(raw:unknown):LearningState=>{
 if(!raw||typeof raw!=='object')return fresh();const data=raw as Record<string,unknown>,result=fresh();
 for(const field of ['reviewed','learned','difficult','favorites'] as const)result[field]=Array.isArray(data[field])?[...new Set((data[field] as unknown[]).filter((id):id is string=>typeof id==='string'&&validIds.has(id)))]:[];
 result.days=Array.isArray(data.days)?[...new Set((data.days as unknown[]).filter((d):d is string=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)))].sort():[];return result;
};
try{state=clean(JSON.parse(localStorage.getItem(key)||'null'))}catch{persistent=false}
const dateKey=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export const getProgress=()=>state;
const save=()=>{try{localStorage.setItem(key,JSON.stringify(state))}catch{persistent=false}window.dispatchEvent(new Event('hexfield:progress'));};
export function review(id:string){if(!validIds.has(id))return;if(!state.reviewed.includes(id))state.reviewed.push(id);const today=dateKey();if(!state.days.includes(today))state.days.push(today);save()}
export function toggle(id:string,field:'learned'|'difficult'|'favorites'){if(!validIds.has(id))return;state[field]=state[field].includes(id)?state[field].filter(x=>x!==id):[...state[field],id];if(field==='learned'&&state.learned.includes(id))review(id);else save()}
function streak(){let d=new Date();if(!state.days.includes(dateKey(d)))d.setDate(d.getDate()-1);let count=0;while(state.days.includes(dateKey(d))){count++;d.setDate(d.getDate()-1)}return count}
export function renderProgress(){
 document.querySelectorAll<HTMLElement>('[data-progress-panel]').forEach(root=>{const set=(s:string,v:string)=>{const e=root.querySelector(s);if(e)e.textContent=v};set('[data-reviewed]',`${state.reviewed.length} / ${questions.length}`);set('[data-learned]',String(state.learned.length));set('[data-topics]',`${categories.filter(c=>questions.filter(q=>q.category===c.id).every(q=>state.learned.includes(q.id))).length} / ${categories.length}`);set('[data-streak]',`${streak()} days`);const fill=root.querySelector<HTMLElement>('[data-overall-fill]');if(fill)fill.style.width=`${state.learned.length/questions.length*100}%`;set('[data-progress-message]',!persistent?'Storage unavailable: progress lasts for this page session.':state.reviewed.length?'Keep going. Your study record is saved on this device.':'Open a question to start your learning record.');if(!persistent)set('.local-label','SESSION ONLY');});
 document.querySelectorAll<HTMLElement>('[data-category-ids]').forEach(card=>{const ids=card.dataset.categoryIds!.split(','),count=ids.filter(id=>state.learned.includes(id)).length;const label=card.querySelector('[data-category-count]');if(label)label.textContent=`${count} / ${ids.length} learned`;const fill=card.querySelector<HTMLElement>('[data-category-fill]');if(fill)fill.style.width=`${count/ids.length*100}%`;});
 document.querySelectorAll<HTMLElement>('[data-question]').forEach(card=>{const id=card.dataset.question!;for(const field of ['learned','difficult','favorites'] as const){const button=card.querySelector<HTMLButtonElement>(`[data-mark="${field}"]`);if(button){button.setAttribute('aria-pressed',String(state[field].includes(id)));button.classList.toggle('selected',state[field].includes(id))}}});
}
window.addEventListener('hexfield:progress',renderProgress);window.addEventListener('storage',e=>{if(e.key===key){try{state=clean(JSON.parse(e.newValue||'null'))}catch{state=fresh()}window.dispatchEvent(new Event('hexfield:progress'))}});renderProgress();

export const questions = [
 { title:'Como você descreveria sua queda?', options:['Queda difusa por todo o cabelo','Entradas e topo ralo','Falhas em áreas específicas','Só quebra e afinamento dos fios'] },
 { title:'Há quanto tempo isso acontece?', options:['Menos de 3 meses','De 3 a 12 meses','Mais de 1 ano','Sempre tive o cabelo fino'] },
 { title:'O que mais se aproxima da sua rotina?', options:['Estresse e pouco sono','Dieta restritiva ou pós-parto/cirurgia','Química, chapinha e calor','Histórico de calvície na família'] },
 { title:'Qual é o seu objetivo?', options:['Parar a queda','Recuperar densidade e volume','Tratar áreas com calvície','Entender a causa'] }
];
export const profiles = ['Eflúvio (queda por estresse/estado do corpo)','Alopecia androgenética (calvície genética/hormonal)','Queda por fragilidade e danos nos fios','Queda localizada/áreas de falha'];
// Pontuação orientativa de demonstração, sem validade diagnóstica.
const weights = [[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,1,2,3]];
const mappings = [[0,1,3,2],[0,1,3,2],[0,0,2,1],[0,1,3,0]];
export function getProfile(answers) { const score=[0,0,0,0]; answers.forEach((v,q)=>{if(v>=0) score[mappings[q][v]]+=weights[q][v]+1;}); return profiles[score.indexOf(Math.max(...score))] || profiles[0]; }

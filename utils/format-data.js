const deafultDateOptions = {
  day: 'numeric',
  weekday:'long',
  month:'long'
}

export function formatDate(date,options = deafultDateOptions){
  return new Intl.DateTimeFormat('es', options).format(date);
}

export function formatTemp(value){
  return `${Math.floor(value)}°`
}

export function formatWeeklyList(rawData){

  let daylist = [];
  const weekList = [];

  rawData.forEach((item,index) =>{
    daylist.push(item)
    if((index + 1) % 8 === 0){
      weekList.push(daylist);
      daylist = [];
    }
  })
  return weekList;
}
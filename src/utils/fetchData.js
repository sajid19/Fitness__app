
 export const exerciseOptions = {
  method: 'GET',
  
  headers: {
    'X-RapidAPI-Key':'7db6889287mshcb44254a619bc30p12f1c2jsn3bb3dc944e84',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};
  


export  const fetchData = async(url ,options)=> {
  const response =  await fetch(url , options);
  const data =   await response.json();
  return data

}
console.log(exerciseOptions);
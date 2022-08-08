import React, {useState ,useEffect } from 'react';
import  {useParams} from 'react-router-dom';
import { Box } from '@mui/material';
import { exerciseOptions , fetchData , youTubeOptions } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';


const ExerciseDetail = () => {
  const [exerciseDetail, setexerciseDetail] = useState({});
  const [exerciseVideos, setexerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const {id} = useParams()
  useEffect(()=> {
      const fetchExerciseData = async () => {
      const exerciseDBURL = 'https://exercisedb.p.rapidapi.com';
      const youTubeSearchURL = 'https://youtube-search-and-download.p.rapidapi.com';

      const exerciseDetailData = await fetchData(`${exerciseDBURL}/exercises/exercise/${id}`,
      exerciseOptions);
      setexerciseDetail(exerciseDetailData);
      const exerciseVideoData = await fetchData(`${youTubeSearchURL}/search?query=${exerciseDetailData.name}`,
      youTubeOptions);
      setexerciseVideos(exerciseVideoData.contents)
      const targetMuscleExercisesData = await fetchData(`${exerciseDBURL}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
      setTargetMuscleExercises(targetMuscleExercisesData);
      const equimentExercisesData = await fetchData(`${exerciseDBURL}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
      setEquipmentExercises(equimentExercisesData);

    }

    fetchExerciseData();

  },[id]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail}/>
      <ExerciseVideos exerciseVideos={exerciseVideos} name= {exerciseDetail.name}/>
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises}/>
    </Box>
  )
}

export default ExerciseDetail

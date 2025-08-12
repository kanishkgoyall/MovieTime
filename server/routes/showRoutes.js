import express from "express"
import { addShow, getNowPlayingMovies, getShows , getShow } from "../controllers/showController";
import { protectAdmin } from "../middleware/auth";

const showRouter=express.Router();

showRouter.get('/now-playing',protectAdmin,getNowPlayingMovies)
showRouter.post('/add',protectAdmin, addShow)  //only admin can add anew show 
showRouter.get('/all',getShows) //give all shows
showRouter.get('/:movieId',getShow)
export default showRouter; 
import { createStore } from 'redux'
import aud from '../audio/select.mp3'
import aud1 from '../audio/lose.mp3'


const traitement = (state = [1, 1, 1, 1, 1, 1, 1, 1, 1], action) => {
    switch (action.type) {
        case "lose" :
            state = [1, 1, 1, 1, 1, 1, 1, 1, 1]
        case "generate":
            state.splice(0, action.data);
            for (let index = 0; index < parseInt(action.data); index++) {
                const ran = Math.floor(Math.random() * 9)
                state.splice(ran, 0, 0);
            }
        case "play":
            if (action.data === 1) {
                var audio = new Audio(aud);
                audio.play();
            }
            if (action.data === 0) {
                var audio = new Audio(aud1);
                audio.play();
                
            }
        

        
        return [...state];

    }
}

const store = createStore(traitement);
export default store;
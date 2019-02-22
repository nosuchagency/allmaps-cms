import axios from 'axios';
import shared from './Shared';

let Findable = {
    mounted() {
        L.Findable = L.Circle.extend({
            ...shared, ...{
                initialize(findable) {
                    this.findable = findable;
                }
            }
        });
    }
};

export default Findable;
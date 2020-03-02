import {REFRESH, DISABLE} from './type';

export const reload = () => ({type:REFRESH});
export const stop = () => ({type:DISABLE});
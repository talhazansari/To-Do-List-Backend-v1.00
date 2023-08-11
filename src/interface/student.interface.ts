import {Document} from 'mongoose';

export interface IStudent extends Document{
    readonly description:string;
    readonly status: boolean;
}
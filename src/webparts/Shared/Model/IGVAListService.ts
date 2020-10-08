import { IHelix } from "./IGVAListsInterfaces";

export interface IGVAListService {
   
    getAllItems(listName: string): Promise<Array<any>>;
}
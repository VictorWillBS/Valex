import { Request, Response } from 'express';
import * as cardServices from "../services/cardServices"
import * as employeeService from "../services/employeeService"
import * as companyServicer from "../services/companyService"
export async function createCard(req: Request, res: Response) {
  const {apikey} = req.headers
  await companyServicer.validCompanyApiKey(apikey)

  const employeeCardData:{employeeId:number,type:string} = req.body
  await cardServices.validEmployeeAbletoCard(employeeCardData)
  
  
  const employeeName:string|any = await employeeService.getEmployeeName(employeeCardData)
  const cardData:object = await cardServices.createCardData(employeeName,employeeCardData)

  await cardServices.createCard(cardData)
  res.status(200).send('entrei no controller');
}
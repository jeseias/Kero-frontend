import { APICommunicator } from '../Utils/API'

export const DashboardAPI: (route: string) => APICommunicator = (route) => new APICommunicator(route) 
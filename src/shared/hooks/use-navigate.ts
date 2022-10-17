import { NavigateService } from '../services/navigate.service'
import { useInstance } from './use-instance'

export const useNavigate = () => useInstance(NavigateService)

import { toast } from 'react-toastify';

//This class is to centralize errors message
class ToastService {

    error(message){
        toast.error(message);
    }

    success(message){
        toast.success(message);
    }

    warning(message){
        toast.warn(message);
    }

    infor(message){
        toast.info(message);
    }
}

export default ToastService;
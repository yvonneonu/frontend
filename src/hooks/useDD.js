import { useContext } from 'react'
import { SET_DD } from '../store/appSettingsStore'
import { StoreContext } from '../store/StoreContext'

const useDD = () => {
    const {appStore}=useContext(StoreContext)

    const globalDropDownFn=(name)=>{
        appStore.dispatchApp({
            type: SET_DD,
            payload: appStore.data.dd === "" ? name : "",
          });
    }
  return {globalDropDownFn,globalDD:appStore.data.dd }
}

export default useDD
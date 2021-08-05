import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { saveAction } from './action';
import { TopToolbar, useNotify, Notification } from 'react-admin';
import { useHistory } from 'react-router-dom';


export const QuickActions = (props) => {

    const {data, module} = props;
    const [isLoading, setIsLoading] = useState(false);
    const notify = useNotify();
    //const redirect = useRedirect();
    const history = useHistory();

    const save = async () => {
        setIsLoading(true);
        const result = await saveAction(data, module);
        setIsLoading(false);
        if (result && result.success) {
            notify('Data saved successfully', 'success');
            const returnUrl = props?.redirectUrl??module
            //redirect(`${returnUrl}`);
            history.push(`${returnUrl}`)
        } else {
            notify(result.error, 'success');
        }  
    };

    return (
        <>
            <TopToolbar>
                <Button onClick={save}
                    startIcon={<SaveIcon />}
                    color="primary"
                    variant="contained"
                    disabled={isLoading}
                >
                    {'Save'}
                </Button>
            </TopToolbar>
            <Notification />
        </>
    );
}
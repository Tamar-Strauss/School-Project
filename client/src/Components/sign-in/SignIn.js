import { TabView, TabPanel } from 'primereact/tabview';
import { SignInByProfile } from './SignInByProfile';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function SignIn(props) {
    // setUserId={props.setUserId} setStatus={props.setStatus} 
    const [isTeacher, setIsTeacher] = useState(false);

    const { code } = useParams();
    useEffect(() => {
        if (code == 1) { //teachers
            setIsTeacher(true);
        }
    }, [])

    return (
        <>
            {!isTeacher &&
                <div className='flex align-items-center flex-column pt-6 px-3'>
                    <TabView>
                        <TabPanel rightIcon='pi pi-user'>
                            <SignInByProfile status='students' profile='Student' />
                        </TabPanel>
                        <TabPanel rightIcon='pi pi-user-plus'>
                            <SignInByProfile status='teachers' profile='Teacher' />
                        </TabPanel>
                    </TabView>
                </div>
            }
            {isTeacher &&
                <div className='flex align-items-center flex-column pt-6 px-3'>
                    <TabView>
                        <TabPanel rightIcon='pi pi-user-plus'>
                            <SignInByProfile status='teachers' profile='Teacher' />
                        </TabPanel>
                    </TabView>
                </div>
            }

        </>
    )
}
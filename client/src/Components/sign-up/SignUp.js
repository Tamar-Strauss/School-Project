import { TabView, TabPanel } from 'primereact/tabview';
import SignUpStudents from './SignUpStudents';
import SignUpTeachers from './SignUpTeachers';
import './signup.css';

export function SignUp(props) {

    return (
        <>
            <div className='flex align-items-center flex-column pt-6 px-3'>
                <TabView>
                    <TabPanel rightIcon='pi pi-user'>
                        <SignUpStudents />
                    </TabPanel>
                    <TabPanel rightIcon='pi pi-user-plus'>
                        <SignUpTeachers />
                    </TabPanel>
                </TabView>
            </div>
        </>
    )
}
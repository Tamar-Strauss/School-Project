import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import icon from '../../images/logo-school.ico';

export default function Menu(props) {
    const [showEditMsg, setShowEditMsg] = useState(false);
    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let userName, userIcon, userProfile;
    userInfo.status === 'teachers' ? (userName = userInfo.name) : (userName = userInfo.firstName + ' ' + userInfo.lastName);
    userInfo.status === 'teachers' ? (userIcon = 'pi pi-user-plus') : (userIcon = 'pi pi-fw pi-user');
    userInfo.status === 'teachers' ? (userProfile = 'Teacher') : (userProfile = 'Student');

    useEffect(() => {
        // Create and append the script element to the head
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://bringthemhomenow.net/1.0.8/hostages-ticker.js';
        script.setAttribute('integrity', 'sha384-jQVW0E+wZK5Rv1fyN+b89m7cYY8txH4s3uShzHf1T51hdBTizPo7yte');
        script.setAttribute('crossorigin', 'anonymous');
        document.head.appendChild(script);

        // Clean up function to remove the script when the component unmounts
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const items = [
        // ... (existing menu items)
    ];

    const start = <img alt="logo" src={icon} height="40" className="mr-2"></img>;

    const logout = () => {
        navigate('/');
        localStorage.clear();
    };

    return <Menubar model={items} start={start} />;
}

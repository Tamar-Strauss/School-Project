// import { useNavigate } from 'react-router-dom';
// import { Button } from 'primereact/button';
// import { DataView } from 'primereact/dataview';
// 
// import { Panel } from 'primereact/panel';
// import { Toast } from 'primereact/toast';
// import { Dialog } from 'primereact/dialog';
// import Answer from '../Answer';
// import { UseUpdate } from '../../services/UsePutAxios';
// import Stopwatch from './Stopwatch';
// const StudentTest = (props) => {


//     const [submit, setSubmit] = useState(false);
//     const toast = useRef(null);
//     const toastBC = useRef(null);

//     const navigate = useNavigate();

    

//     useEffect(() => {
//         const fetchData = async () => {
//             let questionTest = [];
//             for (let i = 0; i < test.length; i++) {
//                 console.log(test[i]);
//                 questionTest[i] = test[i].questionTest;
//                 questionTest[i].answerText = answers[test[i].question.id];
//             }
//             console.log(questionTest);
//             console.log(test)
//             const res = await UseUpdate(`tests/submit`, { test: questionTest });
//             console.log(res);
//             setSubmit(false);
//             // navigate('/home-students');
//         }
//         if (submit)
//             fetchData();
//     }, [submit]);



   

//     const submitTest = () => {
//         console.log(answers);
//         setSubmit(true);
//     }
//     const confirm = () => {
//         submitTest();
//         setShowMessage(false);
//     }

//     const [showMessage, setShowMessage] = useState(false);
//     const dialogFooter = <div className="flex flex-column align-items-center" style={{ flex: '1' }}>
//         <div className="flex gap-2">
//             <Button onClick={confirm} type="button" label="Confirm" className="p-button-success w-6rem" />
//             <Button onClick={(e) => setShowMessage(false)} type="button" label="Cancel" className="p-button-warning w-6rem" />
//         </div>
//     </div>

//     console.log(answers);
//     return (

//         <div className="card">
//             {/* <Stopwatch /> */}
//             {showMessage &&
//                 <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
//                     <div className="flex align-items-center flex-column pt-6 px-3">
//                         <i className="pi pi-exclamation-triangle" style={{ fontSize: '5rem', color: 'var(--red-400)' }}></i>
//                         <h3>Pay Attention!</h3>
//                         <p style={{ li`neHeight: 1.5, textIndent: '1rem' }}>
//                             After submitting the test it would be impossible to try it again.
//                             <br />Are you sure you want to submit?
//                         </p>
//                     </div>
//                 </Dialog>}
//             
//             <br />
//             <div className="card flex justify-content-center">
//                 <Toast ref={toast} />
//                 <Toast ref={toastBC} position="bottom-center" />
//                 <Button type="button" onClick={() => { setShowMessage(true); }} label="Submit" />
//             </div>
//         </div>
//     );
// }

// export default StudentTest;
// // limited time !!!
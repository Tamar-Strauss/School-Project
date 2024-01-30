// בסיעתא דשמיא

// component for questions of tests per course for teacher checking.
import { useEffect, useState } from 'react';
import { Divider } from 'primereact/divider';
import { TabView, TabPanel } from 'primereact/tabview';
import { Badge } from 'primereact/badge';
import { InputNumber } from 'primereact/inputnumber';
import { UseGetAllById, UseGetOneById } from '../../services/useGetAxios';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { UseUpdate } from '../../services/UsePutAxios';

export function TestCourse(props) {

    const [questions, setQuestions] = useState();
    const [answers, setAnswers] = useState([]);
    const [answersToCheck, setAnswersToCheck] = useState([]);
    const [answersToDisplay, setAnswersToDisplay] = useState([]);
    const [tabs, setTabs] = useState([]);

    // 1
    // create array of questions of test to this course
    useEffect(() => {
        const fetchData = async () => {
            const res = await UseGetAllById('questions/course', props.courseId);
            if (res && res.status && res.status == 200) {
                setQuestions(res.data.filter(question => !question.isClosed));
            }
        }
        fetchData();
    }, [])

    // 2
    // create array of the correct answers respectively
    useEffect(() => {
        const fetchData = async () => {
            questions.forEach(async question => {
                const res = await getCorrectAns(question.id);
                if (res && res.status && res.status == 200 && typeof (res) != Promise && !answers.includes(res)) {
                    answers.push(res.data);
                    setAnswers([...answers]);
                }
            });
        }
        if (questions) {
            fetchData();
        }
    }, [questions])

    // 3
    // create array of arrays of students' answers to check per question 
    useEffect(() => {
        const fetchData = async () => {
            let arr = [];
            questions.forEach(async question => {
                const res = await getStudentsAns(question.id);
                if (res && res.status && res.status == 200) {
                    const notChecked = res.data.filter(ans => !ans.isChecked)
                    arr.push({questionId: question.id, answers: notChecked});
                    setAnswersToCheck([...arr]);
                }
            })
        }
        if (questions)
            fetchData();
    }, [questions])
    
    // 4
    useEffect(() => {
        if (questions && answers)
            setTabs(Array.from({ length: questions.length }, (_, i) => ({
                title: `Question #${i + 1}`,
                content:
                    <>
                        <div className="card flex justify-content-center">
                            <Divider layout='vertical'>
                                <div className="inline-flex align-items-center">
                                    <i className="pi pi-question mr-2"></i>
                                    <br />
                                </div>
                            </Divider>
                            <div className="align-items-center">
                                <h3>Question</h3>
                                <p>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                                    ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                                    {questions[i].text}
                                </p>
                            </div>
                            <Divider layout='vertical'>
                                <div className="inline-flex align-items-center">
                                    <i className="pi pi-check mr-2"></i>
                                </div>
                            </Divider>
                            <div className="align-items-center">
                                <h3>Answer</h3>
                                <p>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                                    ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                                    {answers[i] && answers[i][0].text}
                                </p>
                            </div>
                            <Divider layout='vertical'>
                                <div className="inline-flex align-items-center">
                                    <i className="pi pi-percentage mr-2"></i>
                                </div>
                            </Divider>
                            <div className="align-items-center">
                                <h3>Scores</h3>
                                <div className="inline-flex align-items-center">
                                    <Badge value={questions[i].scores} size="large" severity="secondary"></Badge>
                                </div>
                            </div>
                        </div>
                        <Divider>
                            <div className="inline-flex align-items-center">
                                <i className="pi pi-reply mr-2"></i>
                                <b>Answers Of Students</b>
                            </div>
                        </Divider>
                        {answersToDisplay && answersToDisplay[i] && answersToDisplay[i].data}
                    </>
            })))
    }, [questions, answers, answersToDisplay])

    // 5
    // create array of ans to display
    useEffect(() => {
        // if (questions && answersToCheck && questions.length == 0.5 * answersToCheck.length) {
        if (questions && answersToCheck && questions.length == answersToCheck.length) {
            let mat = [];
            questions.forEach((question, i) => {
                let arr = [];
                for (let j = 0; j < answersToCheck[i].answers.length; j++) {
                    if (answersToCheck[i].questionId == question.id)
                        arr.push(<AnswerToCheck ans={answersToCheck[i].answers[j]} i={i} />);
                }
                if (arr.length < 1)
                    arr.push(displayNoAns)
                mat.push({ key: i, data: arr });
            })
            setAnswersToDisplay([...mat])
        }
    }, [answersToCheck])//answersToCheck, 

    const getCorrectAns = async (questionId) => {
        const res = await UseGetOneById('answers/questionId', questionId);
        if (res && res.status && res.status == 200)
            return res;
    }

    // create array of students' answers to check per question 
    const getStudentsAns = async (questionId) => {
        const res = await UseGetAllById('question_tests/question', questionId);
        if (res && res.status && res.status == 200) {
            return res;
        }
    }
    const AnswerToCheck = (props) => {
        const [value, setValue] = useState(0);
        const [saved, setSaved] = useState(false);
        const [failed, setFailed] = useState(false);
        const [test, setTest] = useState(null);

        useEffect(() => {
            const fetchData = async () => {
                const res = await UseGetOneById('tests', props.ans.testId);
                if (res && res.status && res.status == 200) {
                    setTest(res.data);
                }
            }
            fetchData();
        }, [])

        const onSave = async () => {
            test.scores = test.scores + value;
            setTest(test);
            const res = await UseUpdate('tests', test);
            if (res && res.status && res.status >= 200) {
                const ansToUpdate = props.ans;
                ansToUpdate.isChecked = 1;
                const resAns = await UseUpdate('question_tests', ansToUpdate);
                if (resAns && resAns.status && resAns.status >= 200) {
                    setSaved(true);
                }
                else {
                    setFailed(true);
                }
            }
            else {
                setFailed(true);
            }
        }
        if (props.ans) {// && !props.ans.isChecked) {
            return (
                <>
                    <div className="card flex justify-content-left">
                        <Divider layout='vertical'>
                            <div className="inline-flex align-items-center">
                                <i className="pi pi-comment mr-2"></i>
                            </div>
                        </Divider>
                        <div className="align-items-center">
                            <h3>Answer</h3>
                            Here you will see the student's answer which he have answered while completing the test.
                            <br />
                            Here you will see the student's answer which he have answered while completing the test.
                            <br />
                            {props.ans.answerText}
                        </div>
                        <Divider layout='vertical'>
                            <div className="inline-flex align-items-center">
                                <i className="pi pi-search mr-2"></i>
                            </div>
                        </Divider>
                        <div className="card flex flex-column gap-1">
                            <label htmlFor="scores" className="font-bold block mb-2">Mark this answer</label>
                            <br />
                            <InputNumber inputId={`scores_${props.i}`} value={value} min={value} max={questions[props.i].scores} onValueChange={(e) => setValue(e.value)} suffix={` / ${questions[props.i].scores}`} />
                        </div>
                        <Divider layout='vertical'>
                            <div className="inline-flex align-items-center">
                                <i className="pi pi-replay mr-2"></i>
                            </div>
                        </Divider>
                        <div className="card flex flex-column gap-2">
                            <b>Finish & Save</b>
                            <br />
                            {!saved && <Button icon="pi pi-save" rounded className="p-button-outlined" onClick={onSave} />}
                            {saved && <Message severity="success" text="Saved" />}
                            {failed && <Message severity="error" text="Failed" />}
                        </div>
                    </div>
                    <Divider />
                </>
            )
        }
    }

    const displayNoAns = <>
        <div className="card flex justify-content-center">
            <Divider>
                <div className="inline-flex align-items-center">
                    <i className="pi pi-search-minus mr-2"></i>
                    <span>No Answers Are Found</span>
                </div>
            </Divider>
        </div>
    </>

    return (
        <>
            {tabs.length > 1 && <div className="card">
                <TabView scrollable>
                    {tabs.map((tab) => {
                        return (
                            <TabPanel key={tab.title} header={tab.title}>
                                <div className="m-0">{tab.content}</div>
                            </TabPanel>
                        );
                    })}
                </TabView>
            </div>}
        </>
    )
}
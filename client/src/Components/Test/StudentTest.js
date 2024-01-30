import React, { useState, useEffect } from 'react';

import { DataView } from 'primereact/dataview';
import { Panel } from 'primereact/panel';
import { Tag } from 'primereact/tag';
import Menu from '../menu/menu';
import Answer from '../Answer';

const StudentTest = (props) => {

    const test = JSON.parse(localStorage.getItem('test'));
    const [answers, setAnswers] = useState({});
    const [questions, setQuestions] = useState(props.questions);

    useEffect(() => {
        setQuestions(test.map(e => e.question))
    }, [])

    const getSeverity = (question) => {
        if (question.scores <= 5)
            return 'success';
        if (question.scores <= 10)
            return 'warning';
        if (question.scores > 10)
            return 'danger';
        else return null;
    };

    const setAnswersCallBack = (ans) => {
        let _answers = answers;
        _answers[ans.questionId] = ans.text;
        setAnswers(_answers);
    }

    let count;
    const itemTemplate = (question) => {
        count++;
        return (
            <div className="col-12">
                <Panel id={question.id} header={`Question #${count / 2}`} toggleable>
                    <p className="m-0">{question.text}</p>
                    <Tag
                        value={question.scores}
                        severity={getSeverity(question)}
                    />
                    <Answer questionId={question.id} setAnswersCallBack={setAnswersCallBack} />
                </Panel>
            </div>
        );
    };

    console.log(questions);
    return (
        <>
            <Menu />
            <DataView
                value={questions}
                itemTemplate={itemTemplate}
                paginator
                row={5}
            />
        </>
    )
}

export default StudentTest;
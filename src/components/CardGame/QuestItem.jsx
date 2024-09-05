import useQuest from "../../hooks/useQuest";
import QuizItem from "./QuizItem";
import RiddleItem from "./RiddleItem";
import { useContext } from "react";
import CardContext from "../../context/CardContext";

const QuestItemBody = ({quest}) => {
    const type = quest.__typename;

    switch (type) {
        case 'Quiz':
            console.log('[Quest type] Quiz');
            return <QuizItem quest={quest} />

        case 'Riddle':
            console.log('[Quest type] Riddle');
            return <RiddleItem quest={quest} />

        default:
            console.log('[Quest type] none: ', type);
            return null
    }
}
    

const QuestItem = () => {
    const { gameid, step } = useContext(CardContext);
    const {quest} = useQuest(gameid, step);
    
    return (
        <QuestItemBody quest={quest} />
    )
}


export default QuestItem
import { useState } from "react"
import { Box, Text, Flex, Icon, Checkbox } from "@fuel-ui/react"

interface TaskProps {
    tasks: string[]
}

export default function Task({ tasks }: TaskProps){
    const [isComplete, setIsComplete] = useState<boolean[]>(new Array(tasks.length).fill(false));

    function handleUpdate(index: number){
        const copy = isComplete.map((a, i) => {
            if(i === index){
                return !a;
            } else {
                return a;
            }
        })
        setIsComplete(copy);
    }

    return (
        <Box css={{border: "1px dashed $accent8", padding: "$4", margin: "$8 0"}}>
            <Flex gap='$1'>
            <Icon
                icon="CheckCircle"
                inline
            />
            <Text>Task!</Text>
            </Flex>
            {tasks.map((task, index) => (
                <Flex key={index} gap='$2' css={{margin: '$1 0'}}>
                    <Checkbox css={{flexShrink: 0}} onCheckedChange={() => handleUpdate(index)}/>
                    <p style={isComplete[index] == true ? {margin: 0, textDecoration: "line-through"} : {margin: 0}}>{task}</p>
                </Flex>
            ))}
        </Box>
    )
}
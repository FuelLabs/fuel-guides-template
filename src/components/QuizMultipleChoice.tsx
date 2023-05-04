import { useState } from "react"
import { Box, Text, Flex, Icon, Button, Alert, Checkbox } from "@fuel-ui/react"

interface QuizMultipleChoiceProps {
    question: string,
    options: string[],
    answerIndexes: number[]
}

export default function QuizMultipleChoice({ question, options, answerIndexes }: QuizMultipleChoiceProps) {
    const [status, setStatus] = useState<'pass' | 'fail' | 'not submitted'>('not submitted')
    const [answers, setAnswers] = useState<boolean[]>(new Array(options.length).fill(false))

    function handleSubmit() {
        function arrayEquals(a: number[], b: number[]) {
            return Array.isArray(a) &&
                Array.isArray(b) &&
                a.length === b.length &&
                a.every((val, index) => val === b[index]);
        }

        let correctAnswers: number[] = [];
        answers.forEach((answer, index) => {
            if (answer === true) {
                correctAnswers.push(index)
            }
        })
        arrayEquals(correctAnswers, answerIndexes) ? setStatus('pass') : setStatus('fail');

    }

    const handleOnChange = (position: number) => {
        const newAnswers = answers.map((item, index) =>
            index === position ? !item : item
        );
        setAnswers(newAnswers);
    };

    return (
        <Box css={{ border: "1px dashed $accent8", padding: "$4", margin: "$8 0" }}>
            <Flex gap='$1'>
                <Icon
                    icon="WarningCircle"
                    inline
                />
                <Text>Quiz</Text>
            </Flex>
            <Box css={{ margin: '$1 0', fontWeight: 'bold' }}>{question}</Box>
            <form>
                {options.map((answer, index) => (
                    <Flex gap='$2' css={{margin: '$1 0'}} key={index}>
                        <Checkbox
                            isDisabled={status == 'pass'}
                            id={answer.toLowerCase().replace(/\s+/g, '-')}
                            name={"quiz" + options[0]}
                            value={answer}
                            onCheckedChange={() => {
                                handleOnChange(index);
                            }}
                        />
                        <label htmlFor={answer.toLowerCase().replace(/\s+/g, '-')}>{answer}</label><br />
                    </Flex>
                ))}
                {status !== "pass" ?
                    <Button css={{ margin: '$4 0' }} onPress={handleSubmit}>Submit</Button>
                    :
                    <Alert
                        css={{ margin: '$4 0' }}
                        direction="row"
                        status="success"
                    >
                        <Alert.Description>
                            Correct!
                        </Alert.Description>
                    </Alert>
                }
                {status === 'fail' && <Alert
                    css={{ margin: '$4 0' }}
                    direction="row"
                    status="error"
                >
                    <Alert.Description>
                        Incorrect, please try again.
                    </Alert.Description>
                </Alert>
                }
            </form>
        </Box>
    )
}
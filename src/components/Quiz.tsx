import { useState } from "react"
import { Box, Text, Flex, Icon, Button, Alert, Form, RadioGroup } from "@fuel-ui/react"

interface QuizProps {
    question: string,
    options: string[],
    answerIndex: number
}

export default function Quiz({ question, options, answerIndex }: QuizProps) {
    const [status, setStatus] = useState<'pass' | 'fail' | 'not submitted'>('not submitted')
    const [answer, setAnswer] = useState<string>('')

    function handleSubmit() {
        answer == options[answerIndex] ? setStatus('pass') : setStatus('fail');
    }

    return (
        <Box css={{ border: "1px dashed $accent8", padding: "$4", margin: "$8 0" }}>
            <Flex gap='$1'>
                <Icon
                    icon="WarningCircle"
                    inline
                />
                <Text>Quiz</Text>
            </Flex>
            <Box css={{margin: '$1 0', fontWeight: 'bold'}}>{question}</Box>
            <form>
                <div onChange={(e: any) => setAnswer(e.target.value)}>
                    {options.map((answer, index) => (
                        <div key={index}>
                            <input
                                disabled={status == 'pass' && answer !== options[answerIndex]}
                                type="radio"
                                id={answer.toLowerCase().replace(/\s+/g, '-')}
                                name={"quiz" + options[0]}
                                value={answer}
                            />
                            <label htmlFor={answer.toLowerCase().replace(/\s+/g, '-')}>{answer}</label><br />
                        </div>
                    ))}
                </div>
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
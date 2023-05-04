import { Grid, Card, Heading, Badge, Icon } from '@fuel-ui/react';
import { MENU_ORDER, MENU_DESCRIPTIONS } from "../constants"
import Link from 'next/link';
import { cssObj } from "@fuel-ui/css"

export default function CourseCards() {
    return (
        <Grid css={styles.grid} >
            {MENU_ORDER.map((item, index) => {
                if (item !== "Welcome") {
                    return (
                        <Link key={item} href={"/journey/" + item.replace(/\s+/g, '-').toLowerCase()}>
                            <Card css={{ height: "250px" }}>
                                <Card.Header>
                                    <Heading
                                        css={{ borderBottom: '2px solid #03c399', }}
                                        as="h3"
                                        leftIcon={item}
                                    >
                                        {item}
                                    </Heading>
                                </Card.Header>
                                <Card.Body css={{ color: 'var(--colors-textColor)' }}>
                                    {MENU_DESCRIPTIONS[index]}
                                </Card.Body>
                                <Card.Footer gap='$1' direction="row-reverse">
                                    {index == 1 &&
                                        <>
                                            <Badge variant='solid'>Completed</Badge>
                                            <Icon
                                                icon="CircleWavyCheck"
                                                inline
                                            />
                                        </>
                                    }
                                    {index == 2 &&
                                        <>
                                            <Badge>In Progress</Badge>
                                            <Icon
                                                icon="CaretCircleDoubleRight"
                                                inline
                                            />
                                        </>
                                    }
                                </Card.Footer>
                            </Card>
                        </Link>
                    )
                }
            }
            )}
        </Grid>
    )
}

const styles = {
    grid: cssObj({
        gap: "24px",
        gridTemplateColumns: "repeat(2, 1fr)",
        '@md': {
            gridTemplateColumns: "repeat(3, 1fr)",
          },
    })
}
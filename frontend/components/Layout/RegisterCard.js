'use client'
import {Button, Card, CardBody, CardFooter, Heading, Stack, Text, useToast} from "@chakra-ui/react";
import {useState} from "react";
import {addUser} from "@/services/betDAOService";

export const RegisterCard = () => {

    const toast = useToast();
    const [isloading, setIsloading] = useState(false);

    const buttonStyle = {
        boxShadow: '2px 1px 1px #001233',
        borderRadius: '10px',
        color: '#FF595A',
        background: '#001233'
    }

    const registerUser = async () => {
        try {
            setIsloading(true);
            await addUser();
            setIsloading(false);
            toast({
                title: "You are registered ",
                status: "success",
            });
        } catch (error) {
            setIsloading(false);
            toast({
                title: error.name,
                description: error.shortMessage,
                status: "error",
            });
        }
    };

    return (
        <Card
            direction={{base: 'column', sm: 'row'}}
            overflow='hidden'
            variant='outline'>
            <Stack>
                <CardBody>
                    <Heading size='md'>You are not registered</Heading>
                    <Text py='2'>
                        By clicking on the button you can register and start betting right now
                    </Text>
                </CardBody>

                <CardFooter>
                    <Button style={buttonStyle} onClick={registerUser} isLoading={isloading}>
                        register
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    )
}
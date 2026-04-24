import { TaskList } from "@/types/TaskList";
import React from "react";
import { Pressable } from "react-native";
import { Box } from "../ui/box";
import { Progress, ProgressFilledTrack } from "../ui/progress";
import { Text } from "../ui/text";

const TaskListCard: React.FC<{item: TaskList}> = ({item}) => {
    // Variables, useState, hook que regrese información


    //Funciones


    //useEffects


    //Render
    return (
        <Pressable className="p-4 border border_gray_300 rounded-xl mb-3">
            {/*Título*/}
            <Text className="text-lg font-semibold">{item.title}</Text>
            {/*Subtítulo*/}
            <Text className="text-gray-500 text-sm mb-2">{item.subtitle}</Text>
            {/*Progress*/}
            <Box className="mb-3">
                <Progress value={item.percentage} size = "md">
                    <ProgressFilledTrack/>
                </Progress>
                <Text className="text-xs text-gray-500 mt-1">
                    {item.percentage}% completed
                </Text>
            </Box>
        </Pressable>
    );  
}
export default TaskListCard;
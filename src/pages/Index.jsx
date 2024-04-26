import React, { useState } from "react";
import { Box, Button, Container, Flex, Input, Stack, Text, VStack, Image, IconButton, useToast } from "@chakra-ui/react";
import { FaTwitter, FaRegHeart, FaRegComment, FaRetweet } from "react-icons/fa";

const Index = () => {
  const [tweets, setTweets] = useState([]);
  const [tweetInput, setTweetInput] = useState("");
  const toast = useToast();

  const handleTweetSubmit = () => {
    if (tweetInput.trim() === "") {
      toast({
        title: "Error",
        description: "Tweet can't be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newTweet = {
      id: tweets.length + 1,
      content: tweetInput,
      likes: 0,
      comments: 0,
      retweets: 0,
    };
    setTweets([newTweet, ...tweets]);
    setTweetInput("");
  };

  return (
    <Container maxW="container.md" py={5}>
      <Flex mb={4} justifyContent="center" alignItems="center">
        <FaTwitter size="2rem" color="#1DA1F2" />
      </Flex>
      <VStack spacing={4}>
        <Box w="100%">
          <Input placeholder="What's happening?" value={tweetInput} onChange={(e) => setTweetInput(e.target.value)} />
          <Button mt={2} colorScheme="twitter" onClick={handleTweetSubmit}>
            Tweet
          </Button>
        </Box>
        {tweets.map((tweet) => (
          <Box key={tweet.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg" w="100%">
            <Text mb={2}>{tweet.content}</Text>
            <Stack direction="row" spacing={4}>
              <IconButton
                aria-label="Like tweet"
                icon={<FaRegHeart />}
                onClick={() => {
                  const updatedTweets = tweets.map((t) => (t.id === tweet.id ? { ...t, likes: t.likes + 1 } : t));
                  setTweets(updatedTweets);
                }}
              />
              <IconButton aria-label="Comment on tweet" icon={<FaRegComment />} />
              <IconButton aria-label="Retweet" icon={<FaRetweet />} />
            </Stack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;

import { useState } from 'react'
import { Box } from '@chakra-ui/react'

import { ChatState } from '../context/ChatProvider'
import { ChatBox, MyChats } from '../components'

const Chat = () => {
  const { user } = ChatState()
  const [fetchAgain, setFetchAgain] = useState(false)

  return (
    <div style={{ width: '100%', marginTop: '3rem' }}>
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  )
}

export default Chat

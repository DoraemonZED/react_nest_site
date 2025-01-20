import React from 'react';
import { Button } from '@heroui/react';
import { message } from '@/utils/message';

const Home = () => {

  function showMessage() {
    message.show('这是一个消息', 'primary');
  }
  
  return (
    <div>
      <h1>首页</h1>
      <div className='flex justify-center items-center h-screen gap-4 flex-wrap'>
        <Button onPress={showMessage}>未设置</Button>
        <Button color='primary'>primary</Button>
        <Button color='secondary'>secondary</Button>
        <Button color='success'>success</Button>
        <Button color='warning'>warning</Button>
        <Button color='danger'>danger</Button>
        <Button className='bg-content1'>content1</Button>
        <Button className='bg-content2'>content2</Button>
        <Button className='bg-content3'>content3</Button>
      </div>
    </div>
  );
};

export default Home; 
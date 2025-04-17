// src/composables/useMqtt.js
import { ref, onUnmounted } from 'vue';
import mqtt from 'mqtt';

export function useMqtt(brokerUrl, options = {}) {
  const client = ref(null);
  const messages = ref([]);
  const isConnected = ref(false);

  const connect = () => {
    client.value = mqtt.connect(brokerUrl, options);

    client.value.on('connect', () => {
      isConnected.value = true;
      console.log('MQTT Connected');

      // ✅ 在连接成功后订阅主题
      client.value.subscribe(options.topic, (err) => {
        if (err) {
          console.error("订阅失败:", err);
        } else {
          console.log(`成功订阅主题: ${options.topic}`);
        }
      });
    });

    client.value.on('message', (topic, message) => {
      console.log('message',topic, message.toString())
      // messages.value.push({
      //   topic,
      //   payload: message.toString(),
      // });
    });

    client.value.on('error', (err) => {
      console.error('MQTT Error:', err);
    });
  };

  const subscribe = (topic) => {
    console.log('lllllll',client.value && isConnected.value)
    if (client.value && isConnected.value) {
   
      client.value.subscribe(topic, (err) => {
        if (err) console.error('Subscribe error:', err);
        else console.log(`Subscribed to ${topic}`);
      });
    }
  };

  const publish = (topic, message) => {
    if (client.value && isConnected.value) {
      client.value.publish(topic, message);
    }
  };

  const disconnect = () => {
    if (client.value) {
      client.value.end();
      isConnected.value = false;
      console.log('MQTT Disconnected');
    }
  };

  // 组件卸载时自动断开
  onUnmounted(() => {
    disconnect();
  });

  return {
    client,
    messages,
    isConnected,
    connect,
    subscribe,
    publish,
    disconnect,
  };
}
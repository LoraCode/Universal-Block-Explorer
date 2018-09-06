require 'websocket-client-simple'

WebSocket::Client::Simple.connect 'ws://example.com:8888' do |ws|
  ws.on :open do
    puts 'connect!'
  end

  ws.on :open do
    ws.send json: { op: 'blocks_sub' }
  end

  ws.on :message do |msg|
    puts msg.data
  end
  
end

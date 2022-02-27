using System.Net;
using UnityEngine;
using WebSocketSharp;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
public class SockedManager
{
    private static IPEndPoint server_endpoint = new IPEndPoint(ServerConfig.SERVER_IP, ServerConfig.SERVER_PORT);
    private static WebSocket ws = new WebSocket("ws://" + server_endpoint.ToString());

    public static void connect()
    {
        ws.Connect();
        ProtocolBase join = new ProtocolBase(PlayerData.PLAYER_NAME, ProtocolType.Join);
        ws.Send(JsonConvert.SerializeObject(join));
        ws.OnMessage += (sender, e) =>
        {
            Debug.Log("Hi");
            eventManager(e.Data);
        };
    }
    public static void sendMove(Vector3 pos)
    {
        ProtocolMove moveProtocol = new ProtocolMove(PlayerData.PLAYER_NAME, pos);
        ws.Send(JsonConvert.SerializeObject(moveProtocol));
    }

    private static void eventManager(string data)
    {
        Debug.Log("0 -> " + data);
        JObject json = new JObject(data);
        Debug.Log("1-> " + json.GetValue("name").ToString());
        Debug.Log("2-> " + json.GetValue("type").ToString());
        ProtocolType action = (ProtocolType) new JObject(data).GetValue("type").ToObject<int>();
        Debug.Log(action);
        Debug.Log(data);
        switch (action)
        {
            case ProtocolType.Join:
                OnlineManager.enemyConect(JsonConvert.DeserializeObject<ProtocolBase>(data));
                break;
            case ProtocolType.Move:
                break;
            case ProtocolType.Message:
                break;
        }

    }
}
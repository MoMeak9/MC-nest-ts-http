import service from "./service";

const KEY = process.env.GAME_SERVER_API_KEY;
type Command = {
  name: string;
  command: string;
};
export const api = {
  getServerInfo: '/status/LightWorldMC',
  commandServer: `/execute/?apikey=${KEY}`,
};

export function queryServerInfo() {
  return service({
    url: api.getServerInfo,
    method: 'get',
  });
}

export function commandServer(param: Command) {
  return service({
    url: api.commandServer,
    method: 'post',
    data: param,
  });
}

import { delay, http,HttpResponse } from "msw"

export const handlers = [
    http.get("/123", async () => {
        await delay(2000)
        return HttpResponse.json(
            {
                success: true,
                msg: '成功',
                data:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            })
    }),
]
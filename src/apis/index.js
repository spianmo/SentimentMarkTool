import http from '@/utils/http'

const api = {
    dataset(){
        return http.get("/api/dataset")
    },
    text(datasetName, pageId, size, onlyNoMark = false){
        return http.get("/api/text",{
            datasetName,
            pageId: pageId,
            size,
            onlyNoMark
        })
    },
    mark(datasetName, labelId, emotion) {
        return http.post('/api/mark', {
            datasetName,
            labelId,
            emotion
        })
    }
}

export default api

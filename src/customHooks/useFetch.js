import { useState, useEffect } from 'react'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/'

export default function useFetch(endpoint = '') {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true

        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(`${BASE_URL}${endpoint}`)
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const json = await res.json()
                if (isMounted) setData(json)
            } catch (err) {
                if (isMounted) setError(err)
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        fetchData()

        return () => {
            isMounted = false
        }
    }, [endpoint])

    return { data, loading, error }
}

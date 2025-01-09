import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore"
import { db } from '../firebase'

function Antalya() {
  const [count, setCount] = useState(0)
  const [firstValue, setFirstValue] = useState(null)
  const [secondValue, setSecondValue] = useState(null)
  const [thirdValue, setThirdValue] = useState(null)
  const [fourthValue, setFourthValue] = useState(null)
  const [fifthValue, setFifthValue] = useState(null)
  const [sixthValue, setSixthValue] = useState(null)
  const [seventhValue, setSeventhValue] = useState(null)
  const [vehicle, setVehicle] = useState(null)
  const [stokData, setStokData] = useState([])
  const [editId, setEditId] = useState(null)

  const handleClick = (e) => {
    e.preventDefault()
    setCount(firstValue - secondValue)
  }

  const handleFourthValueChange = () => {
    if (firstValue !== null && firstValue !== 0) {
      setFourthValue(Math.floor(thirdValue / firstValue))
    }
  }

  const handleFifthValueChange = () => {
    if (secondValue !== null && secondValue !== 0) {
      setFifthValue(Math.floor(thirdValue / secondValue))
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (editId) {
      try {
        const docRef = doc(db, "stok", editId)
        await updateDoc(docRef, {
          "Araç Üstü": firstValue,
          "Depoya İnen": secondValue,
          "Toplam Ödeme": thirdValue,
          "Araç Üstü Ortalama": fourthValue,
          "Depoya İnen Ortalama": fifthValue,
          "Toplam Nokta": sixthValue,
          "Toplam Ödeme": seventhValue,
          "Araç": vehicle
        })
        alert("Data updated successfully!")
        setEditId(null)
      } catch (e) {
        console.error("Error updating document: ", e)
        alert("Error updating data.")
      }
    } else {
      try {
        await addDoc(collection(db, "stok"), {
          "Araç Üstü": firstValue,
          "Depoya İnen": secondValue,
          "Toplam Ödeme": thirdValue,
          "Araç Üstü Ortalama": fourthValue,
          "Depoya İnen Ortalama": fifthValue,
          "Toplam Nokta": sixthValue,
          "Toplam Ödeme": seventhValue,
          "Araç": vehicle
        })
        alert("Data saved successfully!")
      } catch (e) {
        console.error("Error adding document: ", e)
        alert("Error saving data.")
      }
    }
    fetchStokData()
  }

  const fetchStokData = async () => {
    const querySnapshot = await getDocs(collection(db, "stok"))
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setStokData(data)
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setFirstValue(item["Araç Üstü"])
    setSecondValue(item["Depoya İnen"])
    setThirdValue(item["Toplam Ödeme"])
    setFourthValue(item["Araç Üstü Ortalama"])
    setFifthValue(item["Depoya İnen Ortalama"])
    setSixthValue(item["Toplam Nokta"])
    setSeventhValue(item["Toplam Ödeme"])
    setVehicle(item["Araç"])
  }
  useEffect(() => {
    fetchStokData()
  }, [])

  return (
    <>
      <form action="">
        <div className='form-item'>
          <label htmlFor="#">Şehir Seçin</label>
          <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
            <option value="araç1">araç1</option> 
            <option value="araç2">araç2</option> 
            <option value="araç3">araç3</option> 
          </select>
        </div>
        <div className="form-item">
          <label htmlFor="">Araç Üstü Stok</label>
          <input type="number" value={firstValue} onChange={(e) => setFirstValue(Number(e.target.value))} />
        </div>
        <div className="form-item">
          <label htmlFor="">Depoya İnen Stok</label>
          <input type="number" value={secondValue} onChange={(e) => {
            setSecondValue(Number(e.target.value))
          }} onMouseLeave={handleClick} />
        </div>
        <div className="form-item">
          <label htmlFor="">Mal Fazlası</label>
          <div>{count}</div>
        </div>
        <div className="form-item">
          <label htmlFor="">Toplam Ödeme</label>
          <input type="number" value={thirdValue} onChange={(e) => {
            setThirdValue(Number(e.target.value))
            handleFourthValueChange()
            handleFifthValueChange()
          }} />
        </div>
        <div className="form-item">
          <label htmlFor="">Araç Üstü Stok Ortalaması</label>
          <div>{fourthValue}</div>
        </div>
        <div className="form-item">
          <label htmlFor="">Depoya İnen Stok Ortalaması</label>
          <div>{fifthValue}</div>
        </div>
        <div className="form-item">
          <label htmlFor="">Toplama Nokta Sayısı</label>
          <input type="number" value={sixthValue} onChange={(e) => setSixthValue(Number(e.target.value))} />
        </div>
        <div className="form-item">
          <label htmlFor="">Toplam Ödeme</label>
          <input type="number" value={seventhValue} onChange={(e) => setSeventhValue(Number(e.target.value))} />
        </div>
        <button onClick={handleSave}>{editId ? "Güncelle" : "Kaydet"}</button>
      </form>
      <div className="stok-list">
        <h2>Stok Listesi</h2>
        {stokData.map((item, index) => (
          <div key={index}>
            <p>Araç Üstü: {item["Araç Üstü"]}</p>
            <p>Depoya İnen: {item["Depoya İnen"]}</p>
            <p>Toplam Ödeme: {item["Toplam Ödeme"]}</p>
            <p>Araç Üstü Ortalama: {item["Araç Üstü Ortalama"]}</p>
            <p>Depoya İnen Ortalama: {item["Depoya İnen Ortalama"]}</p>
            <p>Toplam Nokta: {item["Toplam Nokta"]}</p>
            <p>Toplam Ödeme: {item["Toplam Ödeme"]}</p>
            <p>Araç: {item["Araç"]}</p>
            <button onClick={() => handleEdit(item)}>Düzenle</button>
            <br />
          </div>
        ))}
      </div>
    </>
  )
}

export default Antalya

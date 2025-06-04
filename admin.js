// إعدادات Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCqLIInr3ygfUcQVauAjtZsB-WIWBnBNBg",
    authDomain: "shakawy-e906e.firebaseapp.com",
    databaseURL: "https://shakawy-e906e-default-rtdb.firebaseio.com",
    projectId: "shakawy-e906e",
    storageBucket: "shakawy-e906e.firebasestorage.app",
    messagingSenderId: "912635139012",
    appId: "1:912635139012:web:f5580cca52b0bf02e34a91",
    measurementId: "G-C5YPWCVDBK"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// عرض الشكاوى
db.collection("complaints").orderBy("createdAt", "desc").onSnapshot(snapshot => {
    const complaintsList = document.getElementById('complaintsList');
    complaintsList.innerHTML = '';

    snapshot.forEach(doc => {
        const complaint = doc.data();
        const div = document.createElement('div');
        div.style = "margin:10px;padding:10px;border:1px solid #ccc;border-radius:5px;";
        div.innerHTML = 
            <strong>الاسم:</strong> ${complaint.name} <br>
            <strong>الوحدة:</strong> ${complaint.unit} <br>
            <strong>الهاتف:</strong> ${complaint.phone} <br>
            <strong>العنوان:</strong> ${complaint.title} <br>
            <strong>الوصف:</strong> ${complaint.description} <br>
            <strong>الحالة:</strong> ${complaint.status} <br>
            <button onclick="updateStatus('${doc.id}', 'قيد المعالجة')">تحديث لـ قيد المعالجة</button>
            <button onclick="updateStatus('${doc.id}', 'تم الحل')">تحديث لـ تم الحل</button>
        ;
        complaintsList.appendChild(div);
    });
});

// تحديث حالة الشكوى
function updateStatus(id, newStatus) {
    db.collection("complaints").doc(id).update({
        status: newStatus
    }).then(() => {
        alert("تم تحديث الحالة بنجاح ✅");
    }).catch((error) => {
        console.error("خطأ في التحديث: ", error);
    });
const fs = require('fs');

async function testQuery() {
  const url = "https://tmucjycefiyhthgoladq.supabase.co/rest/v1/pacientes_espera?select=*&estado=in.(en_consulta,en_triaje)&created_at=gte.2026-09-29T00:16:17.850906%2B00:00&sede=eq.Sede%20B";
  const res = await fetch(url, {
    headers: {
      'apikey': 'sb_publishable_GRERFbwae5xPLjMPG55zXA_Z2GWb3qB',
      'Authorization': 'Bearer sb_publishable_GRERFbwae5xPLjMPG55zXA_Z2GWb3qB'
    }
  });
  const data = await res.json();
  console.log("Data length:", data.length || data);
  if (data.length > 0) {
    console.log(JSON.stringify(data.slice(0,2), null, 2));
  }
}

testQuery();

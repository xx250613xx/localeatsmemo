"use client";
import { useState } from "react";

export default function InquiryLayout() {

  // フォームの記入情報
  const [form, setForm] = useState({
    lastNameKana: "",
    firstName: "",
    firstNameKana: "",
    birthdate: "",
    gender: "",
    mobile: "",
    landline: "",
    postal: "",
    prefecture: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("送信しました");
  };

  const images = [
    "/images/mv_01.jpg",
    "/images/mv_02.jpg",
    "/images/mv_03.jpg",
    "/images/mv_04.jpg",
    "/images/mv_05.jpg",
    "/images/mv_06.jpg",
    "/images/mv_07.jpg",
    "/images/mv_08.jpg",
    "/images/mv_09.jpg",
  ];

  return (

      <div className="min-h-screen bg-gray-50 flex md:flex-row flex-col pt-16">
        {/* 画像アニメーションエリア */}
        <div className="relative overflow-hidden bg-white basis-[35%] max-w-[35vw] min-w-[300px]">
          <div className="absolute top-0 left-0 w-full min-h-full animate-scroll">
            <div className="columns-2 gap-2 p-3">
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  className="mb-2 rounded-lg object-cover w-full break-inside-avoid"
                />
              ))}

              {images.reverse().map((src, index) => (
                <img
                  key={`clone-${index}`}
                  src={src}
                  className="mb-2 mt-2 rounded-lg object-cover w-full break-inside-avoid h-[200px]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* フォームエリア */}
        <div className="flex-1 bg-white p-6 sm:p-10 flex items-center justify-center">
          <div className="w-full max-w-xl">
            <h2 className="text-2xl font-bold text-brand-dark mb-6 text-center">
              個人情報入力フォーム
            </h2>


            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div>
                <label className="block font-medium mb-1">お問い合わせ内容</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="ご質問やご要望などをご記入ください"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">姓</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">姓（フリガナ）</label>
                <input
                  name="lastNameKana"
                  value={form.lastNameKana}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">名</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">名（フリガナ）</label>
                <input
                  name="firstNameKana"
                  value={form.firstNameKana}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">生年月日</label>
                <input
                  type="date"
                  name="birthdate"
                  value={form.birthdate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">性別</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-light focus:outline-none"
                >
                  <option value="">選択してください</option>
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                  <option value="other">その他</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">携帯電話番号</label>
                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  required
                  placeholder="+81"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">固定電話番号</label>
                <input
                  name="landline"
                  value={form.landline}
                  onChange={handleChange}
                  placeholder="+81"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">郵便番号（半角）</label>
                <input
                  name="postal"
                  value={form.postal}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">都道府県</label>
                <input
                  name="prefecture"
                  value={form.prefecture}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-light focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">市区町村</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-light focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-dark hover:bg-brand-light text-white font-semibold py-3 rounded-md transition cursor-pointer"
              >
                送信する
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}
import React from "react";

const SITEMAP = [
  {
    title: "Tìm hiểu",
    links: [
      {
        title: "Điều khoản và quy định",
        href: "https://colorme.vn/blog/dieu-khoan-va-quy-dinh-tai-colorme-47589",
        target: "_blank",
      },
      {
        title: "Trở thành giảng viên",
        href: "https://colorme.vn/jobs",
        target: "_blank",
      },
    ],
  },
  {
    title: "Tìm chúng tôi",
    links: [
      {
        title: "Facebook",
        icon: "",
        href: "https://www.facebook.com/colorme.elearning",
        target: "_blank",
      },
      {
        title: "Instagram",
        icon: "",
        href: "https://www.instagram.com/colorme.hanoi/",
        target: "_blank",
      },
      {
        title: "YouTube",
        icon: "",
        href: "https://www.youtube.com/channel/UC1TpSQdG5rLyADdnrAtzP2w",
        target: "_blank",
      },
    ],
  },
  {
    title: "Xử lý vấn đề",
    links: [
      {
        title: "Trợ giúp",
        href: "https://www.facebook.com/ColorME.Hanoi/?fref=ts",
        target: "_blank",
      },
      {
        title: "Báo lỗi",
        href: "https://www.facebook.com/ColorME.Hanoi/?fref=ts",
        target: "_blank",
      },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-white">
      <div className="container pt-14 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div>
            <h1 className="flex flex-row items-center gap-3">
              <img
                className="w-14 h-14 rounded me-2"
                src="https://d1j8r0kxyu9tj8.cloudfront.net/files/1615901908RumE1C5rg8cDcNF.jpeg"
              />
              <span className="font-bold uppercase">colorME</span>
            </h1>
          </div>

          {SITEMAP.map((col, colIndex) => (
            <div key={`col-${colIndex}`}>
              <h2 className="font-bold uppercase mb-3">{col.title}</h2>
              <div className="flex flex-col">
                {col.links.map((link, linkIndex) => (
                  <a
                    key={`${colIndex}-${linkIndex}`}
                    href={link.href}
                    target="_blank"
                    className="text-zinc-400 hover:text-white py-1 transition"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black">
        <div className="container flex flex-col md:flex-row py-14">
          <div className="w-full sm:w-3/12">
            <a href="http://online.gov.vn/Home/WebDetails/40823">
              <img
                alt=""
                className="w-[80%] max-w-[200px] mb-5"
                src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1608021118L5rdgPkZA1a7DDl.png"
              />
            </a>
          </div>
          <div className="w-full sm:w-9/12 flex flex-col gap-3 text-zinc-400">
            <h4 className="text-xl font-bold text-white mb-3">CÔNG TY CỔ PHẦN KEE EDUCATION</h4>
            <p>KEE EDUCATION COMPANY LIMITED</p>
            <p>Mã số thuế: 0106897051</p>
            <p>
              Địa chỉ: Số 175, phố Chùa Láng, Phường Láng Thượng, Quận Đống Đa, Thành phố Hà Nội
            </p>
            <p>Đại diện pháp luật: Nguyễn Việt Hùng</p>
            <p>Ngày cấp giấy phép: 08/07/2015</p>
            <p>Điện thoại: 024 3550 0333</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

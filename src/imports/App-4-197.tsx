import svgPaths from "./svg-o7bh3ajo0g";
import clsx from "clsx";
type BackgroundImage6Props = {
  additionalClassNames?: string;
};

function BackgroundImage6({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage6Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage5Props = {
  additionalClassNames?: string;
};

function BackgroundImage5({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage5Props>) {
  return <BackgroundImage6 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</BackgroundImage6>;
}
type BackgroundImage4Props = {
  additionalClassNames?: string;
};

function BackgroundImage4({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage4Props>) {
  return (
    <div className={clsx("relative rounded-[2.68435e+07px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage3Props = {
  additionalClassNames?: string;
};

function BackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage3Props>) {
  return (
    <div className={clsx("size-[14px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        {children}
      </svg>
    </div>
  );
}

function BackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] text-nowrap top-[-1.2px]">{children}</p>
    </div>
  );
}

function BackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function IconBackgroundImage5({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage1>
      <g id="Icon">{children}</g>
    </BackgroundImage1>
  );
}
type IconBackgroundImage4Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage4({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage4Props>) {
  return (
    <div className={clsx("size-[16px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type BackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImageProps>) {
  return (
    <div className={clsx("size-[12px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type BackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText1({ text, additionalClassNames = "" }: BackgroundImageAndText1Props) {
  return (
    <div className={clsx("h-[20px] relative shrink-0", additionalClassNames)}>
      <BackgroundImage2>{text}</BackgroundImage2>
    </div>
  );
}
type LinkBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function LinkBackgroundImageAndText({ text, additionalClassNames = "" }: LinkBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute content-stretch flex h-[18.4px] items-start left-0 top-[0.8px]", additionalClassNames)}>
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#6a7282] text-[14px] text-nowrap">{text}</p>
    </div>
  );
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
};

function HeadingBackgroundImageAndText({ text }: HeadingBackgroundImageAndTextProps) {
  return (
    <div className="h-[24px] relative shrink-0 w-full">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#101828] text-[16px] text-nowrap top-[-2.2px]">{text}</p>
    </div>
  );
}
type ButtonBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ButtonBackgroundImageAndText({ text, additionalClassNames = "" }: ButtonBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute bg-[#101828] h-[36px] rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[126.537px]", additionalClassNames)}>
      <IconBackgroundImage3 />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[73.88px] text-[14px] text-center text-nowrap text-white top-[6.8px] translate-x-[-50%]">{text}</p>
    </div>
  );
}

function IconBackgroundImage3() {
  return (
    <BackgroundImage3 additionalClassNames="absolute left-[30.88px] top-[11px]">
      <g id="Icon">
        <path d={svgPaths.p34aacb00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        <path d={svgPaths.p27169580} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        <path d="M7 8.75V1.75" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
      </g>
    </BackgroundImage3>
  );
}

function IconBackgroundImage2() {
  return (
    <BackgroundImage3 additionalClassNames="relative shrink-0">
      <g clipPath="url(#clip0_4_221)" id="Icon">
        <path d="M4.08333 5.83333V12.8333" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        <path d={svgPaths.p1d138400} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
      </g>
      <defs>
        <clipPath id="clip0_4_221">
          <rect fill="white" height="14" width="14" />
        </clipPath>
      </defs>
    </BackgroundImage3>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#4a5565] text-[12px] text-nowrap">{text}</p>
    </div>
  );
}

function ContainerBackgroundImage() {
  return (
    <BackgroundImage4 additionalClassNames="bg-[#f3f4f6] size-[24px]">
      <IconBackgroundImage1 />
    </BackgroundImage4>
  );
}

function IconBackgroundImage1() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.pfcf2110} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p20933800} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
    </BackgroundImage>
  );
}
type NoteCardBackgroundImageAndTextProps = {
  text: string;
};

function NoteCardBackgroundImageAndText({ text }: NoteCardBackgroundImageAndTextProps) {
  return (
    <div className="absolute h-[22.5px] left-[24px] overflow-clip top-[63.99px] w-[265.063px]">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[22.5px] left-0 text-[#101828] text-[18px] text-nowrap top-[-0.8px]">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText({ text, additionalClassNames = "" }: TextBackgroundImageAndTextProps) {
  return (
    <BackgroundImage6 additionalClassNames={clsx("bg-[#f9fafb] h-[23.988px] relative rounded-[2.68435e+07px] shrink-0", additionalClassNames)}>
      <IconBackgroundImage />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[26px] text-[#99a1af] text-[12px] text-nowrap top-[3px]">{text}</p>
    </BackgroundImage6>
  );
}

function IconBackgroundImage() {
  return (
    <BackgroundImage additionalClassNames="absolute left-[8px] top-[5.99px]">
      <path d="M4 1V3" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 1V3" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p333d5300} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.5 5H10.5" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
    </BackgroundImage>
  );
}

function Icon() {
  return (
    <IconBackgroundImage4 additionalClassNames="absolute left-[16px] top-[12px]">
      <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage4>
  );
}

function Button() {
  return (
    <div className="absolute h-[40px] left-[8px] rounded-[8px] top-[32px] w-[169.35px]" data-name="Button">
      <Icon />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[97px] text-[#6a7282] text-[14px] text-center text-nowrap top-[8.8px] translate-x-[-50%]">Kembali ke Daftar</p>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#00a63e] h-[33.6px] relative rounded-[2.68435e+07px] shrink-0 w-[60.063px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[2.68435e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[12.8px] py-[4.8px] relative size-full">
        <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[16px] text-nowrap text-white">IF101</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[117.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] text-nowrap top-[-1.2px]">Teknik Informatika</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[12px] h-[33.6px] items-center relative shrink-0 w-full" data-name="Container">
      <Badge />
      <Text />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[90px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[45px] left-0 text-[#101828] text-[36px] top-[-3.6px] w-[477px]">Teknik Informatika - Dasar Pemrograman</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[29.25px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[29.25px] left-0 text-[#4a5565] text-[18px] text-nowrap top-[-1.6px]">Pengenalan logika pemrograman dan algoritma dasar menggunakan Python.</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 grow h-[184.85px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
        <Container />
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function CourseView() {
  return (
    <BackgroundImage5 additionalClassNames="h-[20px] w-[118.425px]">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[20px] left-[59px] text-[#00a63e] text-[14px] text-center text-nowrap top-[-1.2px] tracking-[0.35px] translate-x-[-50%] uppercase">Total Dokumen</p>
    </BackgroundImage5>
  );
}

function Text1() {
  return (
    <div className="absolute h-[48px] left-0 top-0 w-[28.763px]" data-name="Text">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[48px] left-[14.5px] text-[#101828] text-[48px] text-center text-nowrap top-[-5px] translate-x-[-50%]">2</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[24px] left-[32.76px] top-[25.6px] w-[55.9px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[28.5px] text-[#6a7282] text-[16px] text-center text-nowrap top-[-2.2px] translate-x-[-50%]">Catatan</p>
    </div>
  );
}

function CourseView1() {
  return (
    <BackgroundImage5 additionalClassNames="h-[49.6px] w-[88.662px]">
      <Text1 />
      <Text2 />
    </BackgroundImage5>
  );
}

function CardContent() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[137.6px] items-center justify-center relative shrink-0 w-full" data-name="CardContent">
      <CourseView />
      <CourseView1 />
    </div>
  );
}

function Card() {
  return (
    <div className="h-[139.2px] relative rounded-[10px] shrink-0 w-[240px]" data-name="Card" style={{ backgroundImage: "linear-gradient(149.886deg, rgb(240, 253, 244) 0%, rgb(236, 253, 245) 100%)" }}>
      <div aria-hidden="true" className="absolute border-[#dcfce7] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[0.8px] relative size-full">
        <CardContent />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex h-[184.85px] items-start justify-between left-[16px] top-[96px] w-[992px]" data-name="Container">
      <Container1 />
      <Card />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[312.85px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Container2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[313.65px] items-start left-0 pb-[0.8px] pt-0 px-[53.6px] top-0 w-[1131.2px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.8px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container3 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-0 size-[24px] top-[3.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pb47f400} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p17a13100} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M10 9H8" id="Vector_3" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 13H8" id="Vector_4" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 17H8" id="Vector_5" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[31.988px] left-0 top-[4px] w-[197.613px]" data-name="Heading 2">
      <Icon1 />
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[32px] left-[32px] text-[#101828] text-[24px] text-nowrap top-[-2px]">Daftar Catatan</p>
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-white h-[40px] left-0 rounded-[8px] top-0 w-[320px]" data-name="Input">
      <div className="content-stretch flex items-center overflow-clip pl-[40px] pr-[12px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#717182] text-[14px] text-nowrap">Cari catatan...</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon2() {
  return (
    <IconBackgroundImage4 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p107a080} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M14 14L11.1333 11.1333" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </IconBackgroundImage4>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex h-[40px] items-center left-0 pl-[12px] pr-0 py-0 top-0 w-[28px]" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[40px] left-[672px] top-0 w-[320px]" data-name="Container">
      <Input />
      <Container5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container6 />
    </div>
  );
}

function NoteCard() {
  return <div className="absolute bg-gradient-to-r from-[rgba(0,0,0,0)] h-[5.85px] left-0 to-[#99a1af] top-0 w-[313.063px]" data-name="NoteCard" />;
}

function Badge1() {
  return (
    <div className="bg-[#fef2f2] h-[21.587px] relative rounded-[2.68435e+07px] shrink-0 w-[40.063px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border-[#ffe2e2] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[2.68435e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8.8px] py-[2.8px] relative size-full">
        <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#e7000b] text-[12px] text-nowrap">PDF</p>
      </div>
    </div>
  );
}

function NoteCard1() {
  return (
    <div className="absolute content-stretch flex h-[23.988px] items-start justify-between left-[24px] top-[24px] w-[265.063px]" data-name="NoteCard">
      <Badge1 />
      <TextBackgroundImageAndText text="2023-10-15" additionalClassNames="w-[93.275px]" />
    </div>
  );
}

function NoteCard2() {
  return (
    <div className="absolute h-[45.65px] left-[24px] overflow-clip top-[94.49px] w-[265.063px]" data-name="NoteCard">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[22.75px] left-0 text-[#6a7282] text-[14px] top-[-1.4px] w-[249px]">Penjelasan lengkap tentang Bubble Sort, Merge Sort, dan Quick Sort.</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="basis-0 grow h-[15.988px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <BackgroundImageAndText text="Budi Santoso" />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-[20px] w-[103.488px]" data-name="Container">
      <ContainerBackgroundImage />
      <Text3 />
    </div>
  );
}

function NoteCard3() {
  return (
    <BackgroundImage5 additionalClassNames="h-[20px] w-[13.413px]">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[20px] left-[7px] text-[#4a5565] text-[14px] text-center text-nowrap top-[-1.2px] translate-x-[-50%]">12</p>
    </BackgroundImage5>
  );
}

function Button1() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[8px] h-[36px] items-center justify-center left-0 pl-[0.8px] pr-[0.813px] py-[0.8px] rounded-[8px] top-0 w-[126.525px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <IconBackgroundImage2 />
      <NoteCard3 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute h-[36px] left-0 top-[60px] w-[265.063px]" data-name="Container">
      <Button1 />
      <ButtonBackgroundImageAndText text="Unduh" additionalClassNames="left-[138.52px]" />
    </div>
  );
}

function NoteCard4() {
  return (
    <div className="absolute border-[#f3f4f6] border-[0.8px_0px_0px] border-solid h-[96.8px] left-[24px] top-[164.14px] w-[265.063px]" data-name="NoteCard">
      <Container8 />
      <Container9 />
    </div>
  );
}

function CardContent1() {
  return (
    <div className="absolute h-[284.938px] left-0 top-[5.85px] w-[313.063px]" data-name="CardContent">
      <NoteCard1 />
      <NoteCardBackgroundImageAndText text="Rangkuman Algoritma Sorting" />
      <NoteCard2 />
      <NoteCard4 />
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[292.388px] left-0 overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[314.663px]" data-name="Card">
      <NoteCard />
      <CardContent1 />
    </div>
  );
}

function NoteCard5() {
  return <div className="absolute bg-gradient-to-r from-[rgba(0,0,0,0)] h-[5.85px] left-0 to-[#99a1af] top-0 w-[313.063px]" data-name="NoteCard" />;
}

function Badge2() {
  return (
    <div className="bg-[#faf5ff] h-[21.587px] relative rounded-[2.68435e+07px] shrink-0 w-[41.425px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border-[#f3e8ff] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[2.68435e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8.8px] py-[2.8px] relative size-full">
        <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#9810fa] text-[12px] text-nowrap">IMG</p>
      </div>
    </div>
  );
}

function NoteCard6() {
  return (
    <div className="absolute content-stretch flex h-[23.988px] items-start justify-between left-[24px] top-[24px] w-[265.063px]" data-name="NoteCard">
      <Badge2 />
      <TextBackgroundImageAndText text="2023-10-20" additionalClassNames="w-[95.113px]" />
    </div>
  );
}

function NoteCard7() {
  return (
    <div className="absolute h-[45.65px] left-[24px] overflow-clip top-[94.49px] w-[265.063px]" data-name="NoteCard">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[22.75px] left-0 text-[#6a7282] text-[14px] text-nowrap top-[-1.4px]">Scan catatan tangan materi sebelum UTS.</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[62.513px]" data-name="Text">
      <BackgroundImageAndText text="Siti Aminah" />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-[20px] w-[94.513px]" data-name="Container">
      <ContainerBackgroundImage />
      <Text4 />
    </div>
  );
}

function NoteCard8() {
  return (
    <BackgroundImage5 additionalClassNames="h-[20px] w-[7.775px]">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[20px] left-[4px] text-[#4a5565] text-[14px] text-center text-nowrap top-[-1.2px] translate-x-[-50%]">8</p>
    </BackgroundImage5>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[8px] h-[36px] items-center justify-center left-0 p-[0.8px] rounded-[8px] top-0 w-[126.525px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <IconBackgroundImage2 />
      <NoteCard8 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute h-[36px] left-0 top-[60px] w-[265.063px]" data-name="Container">
      <Button2 />
      <ButtonBackgroundImageAndText text="Unduh" additionalClassNames="left-[138.53px]" />
    </div>
  );
}

function NoteCard9() {
  return (
    <div className="absolute border-[#f3f4f6] border-[0.8px_0px_0px] border-solid h-[96.8px] left-[24px] top-[164.14px] w-[265.063px]" data-name="NoteCard">
      <Container10 />
      <Container11 />
    </div>
  );
}

function CardContent2() {
  return (
    <div className="absolute h-[284.938px] left-0 top-[5.85px] w-[313.063px]" data-name="CardContent">
      <NoteCard6 />
      <NoteCardBackgroundImageAndText text="Catatan Kuliah Minggu 1-7" />
      <NoteCard7 />
      <NoteCard9 />
    </div>
  );
}

function Card2() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[292.388px] left-[338.66px] overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[314.663px]" data-name="Card">
      <NoteCard5 />
      <CardContent2 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[292.388px] relative shrink-0 w-full" data-name="Container">
      <Card1 />
      <Card2 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[460.388px] items-start left-[53.6px] pb-0 pt-[48px] px-[16px] top-[313.65px] w-[1024px]" data-name="Container">
      <Container7 />
      <Container12 />
    </div>
  );
}

function CourseView2() {
  return (
    <div className="bg-[rgba(249,250,251,0.3)] h-[854.038px] relative shrink-0 w-full" data-name="CourseView">
      <Container4 />
      <Container13 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/2 right-1/2 top-[29.17%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 13.3333">
            <path d="M0.833333 0.833333V12.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 16.6667">
            <path d={svgPaths.p1577d880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[36px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 166, 62) 0%, rgb(0, 122, 85) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <BackgroundImage5 additionalClassNames="h-[28px] w-[78.85px]">
      <p className="absolute bg-clip-text font-['Arimo:Bold',sans-serif] font-bold leading-[28px] left-0 text-[18px] text-[rgba(0,0,0,0)] text-nowrap top-[-1.4px]" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(0, 130, 54) 0%, rgb(0, 122, 85) 100%)" }}>
        UniNotes
      </p>
    </BackgroundImage5>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[8px] h-[36px] items-center relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Text5 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[91px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[22.75px] left-0 text-[#6a7282] text-[14px] top-[-1.4px] w-[216px]">Platform berbagi catatan akademik terpercaya. Membantu mahasiswa belajar lebih efisien dengan materi yang terkurasi.</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[16px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <Container15 />
      <Paragraph1 />
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <LinkBackgroundImageAndText text="Semua Fakultas" additionalClassNames="w-[95.263px]" />
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <LinkBackgroundImageAndText text="Mata Kuliah Populer" additionalClassNames="w-[124.363px]" />
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <LinkBackgroundImageAndText text="Catatan Terbaru" additionalClassNames="w-[97.588px]" />
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <LinkBackgroundImageAndText text="Top Kontributor" additionalClassNames="w-[97.113px]" />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[116px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
    </div>
  );
}

function Container17() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[16px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <HeadingBackgroundImageAndText text="Eksplorasi" />
      <List />
    </div>
  );
}

function ListItem4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <LinkBackgroundImageAndText text="Cara Upload" additionalClassNames="w-[76.438px]" />
    </div>
  );
}

function ListItem5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <LinkBackgroundImageAndText text="Pedoman Komunitas" additionalClassNames="w-[127.125px]" />
    </div>
  );
}

function ListItem6() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <LinkBackgroundImageAndText text="FAQ" additionalClassNames="w-[25.613px]" />
    </div>
  );
}

function ListItem7() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <LinkBackgroundImageAndText text="Hubungi Kami" additionalClassNames="w-[88.113px]" />
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[116px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem4 />
      <ListItem5 />
      <ListItem6 />
      <ListItem7 />
    </div>
  );
}

function Container18() {
  return (
    <div className="[grid-area:1_/_3] content-stretch flex flex-col gap-[16px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <HeadingBackgroundImageAndText text="Bantuan" />
      <List1 />
    </div>
  );
}

function Icon4() {
  return (
    <IconBackgroundImage5>
      <path d={svgPaths.p188b5880} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage5>
  );
}

function Link() {
  return (
    <BackgroundImage4 additionalClassNames="bg-[#f9fafb] size-[40px]">
      <Icon4 />
    </BackgroundImage4>
  );
}

function Icon5() {
  return (
    <BackgroundImage1>
      <g clipPath="url(#clip0_4_242)" id="Icon">
        <path d={svgPaths.p4b98700} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p29b16f80} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M14.5833 5.41667H14.5917" id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
      <defs>
        <clipPath id="clip0_4_242">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </BackgroundImage1>
  );
}

function Link1() {
  return (
    <BackgroundImage4 additionalClassNames="bg-[#f9fafb] size-[40px]">
      <Icon5 />
    </BackgroundImage4>
  );
}

function Icon6() {
  return (
    <IconBackgroundImage5>
      <path d={svgPaths.pe968880} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p5272800} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage5>
  );
}

function Link2() {
  return (
    <BackgroundImage4 additionalClassNames="bg-[#f9fafb] size-[40px]">
      <Icon6 />
    </BackgroundImage4>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[16px] h-[40px] items-start relative shrink-0 w-full" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
    </div>
  );
}

function Container20() {
  return (
    <div className="[grid-area:1_/_4] content-stretch flex flex-col gap-[16px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <HeadingBackgroundImageAndText text="Ikuti Kami" />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="gap-[32px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[156px] relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container17 />
      <Container18 />
      <Container20 />
    </div>
  );
}

function Link3() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Link">
      <BackgroundImage2>{`Syarat & Ketentuan`}</BackgroundImage2>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[20px] relative shrink-0 w-[246px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">
        <BackgroundImageAndText1 text="Kebijakan Privasi" additionalClassNames="w-[102.5px]" />
        <Link3 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex h-[52.8px] items-center justify-between pb-0 pt-[0.8px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.8px_0px_0px] border-solid inset-0 pointer-events-none" />
      <BackgroundImageAndText1 text="© 2024 UniNotes. Dibuat oleh Mahasiswa." additionalClassNames="w-[260.837px]" />
      <Container22 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[336.8px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-start pb-0 pt-[48px] px-[16px] relative size-full">
          <Container21 />
          <Container23 />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-white h-[337.6px] relative shrink-0 w-full" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.8px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-0 pt-[0.8px] px-[53.6px] relative size-full">
          <Container24 />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col items-start pb-0 pt-[88px] px-0 relative size-full" data-name="App">
      <CourseView2 />
      <Footer />
    </div>
  );
}
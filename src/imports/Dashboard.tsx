import svgPaths from "./svg-gl49n9aux3";
import clsx from "clsx";
type ContainerBackgroundImage5Props = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage5({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImage5Props>) {
  return (
    <div style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 166, 62) 0%, rgb(0, 122, 85) 100%)" }} className={clsx("relative shrink-0", additionalClassNames)}>
      {children}
    </div>
  );
}
type ContainerBackgroundImage4Props = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage4({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImage4Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">{children}</div>
    </div>
  );
}

function ContainerBackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow h-[33.987px] min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">{children}</div>
    </div>
  );
}

function ContainerBackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[36px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">{children}</div>
    </div>
  );
}
type IconBackgroundImage5Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage5({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage5Props>) {
  return (
    <div className={clsx("absolute size-[16px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}

function LinkBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[#f9fafb] relative rounded-[2.68435e+07px] shrink-0 size-[40px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
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
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return (
    <div className={clsx("h-[15.988px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

function IconBackgroundImage4({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage>
      <g id="Icon">{children}</g>
    </BackgroundImage>
  );
}

function VectorBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-[12.5%_8.33%]">
      <div className="absolute inset-[-5.56%_-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 16.6667">
          {children}
        </svg>
      </div>
    </div>
  );
}

function VectorBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute bottom-[12.5%] left-1/2 right-1/2 top-[29.17%]">
      <div className="absolute inset-[-7.14%_-0.83px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 13.3333">
          {children}
        </svg>
      </div>
    </div>
  );
}
type ParagraphBackgroundImageAndText1Props = {
  text: string;
};

function ParagraphBackgroundImageAndText1({ text }: ParagraphBackgroundImageAndText1Props) {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px] text-nowrap tracking-[0.3px] uppercase">{text}</p>
    </div>
  );
}
type ParagraphBackgroundImageAndTextProps = {
  text: string;
};

function ParagraphBackgroundImageAndText({ text }: ParagraphBackgroundImageAndTextProps) {
  return (
    <div className="h-[18px] relative shrink-0 w-full">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[18px] left-0 text-[#101828] text-[18px] text-nowrap top-[-1.2px]">{text}</p>
    </div>
  );
}
type BackgroundImageAndText2Props = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText2({ text, additionalClassNames = "" }: BackgroundImageAndText2Props) {
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
type HeadingBackgroundImageAndText1Props = {
  text: string;
};

function HeadingBackgroundImageAndText1({ text }: HeadingBackgroundImageAndText1Props) {
  return (
    <div className="h-[24px] relative shrink-0 w-full">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#101828] text-[16px] text-nowrap top-[-2.2px]">{text}</p>
    </div>
  );
}
type BackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText1({ text, additionalClassNames = "" }: BackgroundImageAndText1Props) {
  return (
    <p style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(0, 130, 54) 0%, rgb(0, 122, 85) 100%)" }} className={clsx("absolute bg-clip-text font-['Arimo:Bold',sans-serif] font-bold left-0 text-[rgba(0,0,0,0)] text-nowrap", additionalClassNames)}>
      {text}
    </p>
  );
}
type FacultyListBackgroundImageAndText2Props = {
  text: string;
  additionalClassNames?: string;
};

function FacultyListBackgroundImageAndText2({ text, additionalClassNames = "" }: FacultyListBackgroundImageAndText2Props) {
  return (
    <div className={clsx("absolute h-[40px] left-[24px] overflow-clip top-[98.5px]", additionalClassNames)}>
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] top-[-1.2px] w-[237px]">{text}</p>
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText({ text, additionalClassNames = "" }: BackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute h-[40px] left-[24px] overflow-clip top-[98.5px]", additionalClassNames)}>
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] text-nowrap top-[-1.2px]">{text}</p>
    </div>
  );
}
type FacultyListBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function FacultyListBackgroundImageAndText1({ text, additionalClassNames = "" }: FacultyListBackgroundImageAndText1Props) {
  return (
    <div className={clsx("absolute h-[40px] left-[24px] overflow-clip top-[98.5px]", additionalClassNames)}>
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] top-[-1.2px] w-[243px]">{text}</p>
    </div>
  );
}

function FacultyListBackgroundImage1() {
  return (
    <div className="absolute content-stretch flex h-[32.788px] items-center justify-between left-[24px] pb-0 pt-[0.8px] px-0 top-[154.5px] w-[267.725px]">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.8px_0px_0px] border-solid inset-0 pointer-events-none" />
      <TextBackgroundImageAndText2 text="1 Catatan" />
      <TextBackgroundImageAndText1 text="Lihat" />
    </div>
  );
}
type TextBackgroundImageAndText2Props = {
  text: string;
};

function TextBackgroundImageAndText2({ text }: TextBackgroundImageAndText2Props) {
  return (
    <BackgroundImage1 additionalClassNames="w-[70.063px]">
      <IconBackgroundImage2 />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[20px] text-[#6a7282] text-[12px] top-[-1px] w-[51px]">{text}</p>
    </BackgroundImage1>
  );
}
type FacultyListBackgroundImageProps = {
  additionalClassNames?: string;
};

function FacultyListBackgroundImage({ additionalClassNames = "" }: FacultyListBackgroundImageProps) {
  return (
    <div className={clsx("absolute content-stretch flex h-[32.788px] items-center justify-between left-[24px] pb-0 pt-[0.8px] px-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.8px_0px_0px] border-solid inset-0 pointer-events-none" />
      <TextBackgroundImageAndText text="0 Catatan" />
      <TextBackgroundImageAndText1 text="Lihat" />
    </div>
  );
}
type FacultyListBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function FacultyListBackgroundImageAndText({ text, additionalClassNames = "" }: FacultyListBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute h-[22.5px] left-[24px] overflow-clip top-[68px]", additionalClassNames)}>
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[22.5px] left-0 text-[#101828] text-[18px] text-nowrap top-[-0.8px]">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText1Props = {
  text: string;
};

function TextBackgroundImageAndText1({ text }: TextBackgroundImageAndText1Props) {
  return (
    <BackgroundImage1 additionalClassNames="opacity-0 w-[40.588px]">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#00a63e] text-[12px] text-nowrap top-[-1px]">{text}</p>
      <IconBackgroundImage3 />
    </BackgroundImage1>
  );
}

function IconBackgroundImage3() {
  return (
    <div className="absolute left-[28.59px] size-[12px] top-[1.99px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M4.5 9L7.5 6L4.5 3" id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
};

function TextBackgroundImageAndText({ text }: TextBackgroundImageAndTextProps) {
  return (
    <BackgroundImage1 additionalClassNames="w-[71.888px]">
      <IconBackgroundImage2 />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[20px] text-[#6a7282] text-[12px] top-[-1px] w-[52px]">{text}</p>
    </BackgroundImage1>
  );
}

function IconBackgroundImage2() {
  return (
    <div className="absolute left-0 size-[14px] top-[0.99px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.pd1f0180} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1c197ec0} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M5.83333 5.25H4.66667" id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M9.33333 7.58333H4.66667" id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M9.33333 9.91667H4.66667" id="Vector_5" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function ContainerBackgroundImage1() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[2.68435e+07px] shrink-0 size-[28px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[6px] px-[6px] relative size-full">
        <IconBackgroundImage1 />
      </div>
    </div>
  );
}

function IconBackgroundImage1() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 9.33333">
            <path d={svgPaths.p3ec8f700} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}
type BadgeBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BadgeBackgroundImageAndText({ text, additionalClassNames = "" }: BadgeBackgroundImageAndTextProps) {
  return (
    <div className={clsx("bg-[#f0fdf4] h-[21.587px] relative rounded-[2.68435e+07px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[#dcfce7] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[2.68435e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[10.8px] py-[2.8px] relative size-full">
        <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#008236] text-[12px] text-nowrap">{text}</p>
      </div>
    </div>
  );
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function HeadingBackgroundImageAndText({ text, additionalClassNames = "" }: HeadingBackgroundImageAndTextProps) {
  return (
    <div className={clsx("h-[28px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#1e2939] text-[20px] text-nowrap top-[-2.2px]">{text}</p>
      </div>
    </div>
  );
}

function ContainerBackgroundImage() {
  return (
    <div className="bg-white relative rounded-[10px] shrink-0 size-[41.6px]">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[0.8px] pt-[8.8px] px-[8.8px] relative size-full">
        <IconBackgroundImage />
      </div>
    </div>
  );
}

function IconBackgroundImage() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full">
      <div className="absolute inset-[12.5%_8.33%_16.67%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.88%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 19">
            <path d={svgPaths.p26b11800} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return <div className="bg-[#00a63e] h-[32px] rounded-[2.68435e+07px] shrink-0 w-[4px]" data-name="Container" />;
}

function Heading1() {
  return (
    <div className="h-[36px] relative shrink-0 w-[229.113px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[36px] left-0 text-[#101828] text-[30px] text-nowrap top-[-2.6px]">Jelajahi Fakultas</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[12px] h-[36px] items-center relative shrink-0 w-full" data-name="Container">
      <Container />
      <Heading1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[12px] h-[41.6px] items-center relative shrink-0 w-full" data-name="Container">
      <ContainerBackgroundImage />
      <HeadingBackgroundImageAndText text="Fakultas Teknik (FT)" additionalClassNames="w-[185.938px]" />
    </div>
  );
}

function FacultyList() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList1() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.725px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="IF101" additionalClassNames="w-[47.45px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function FacultyList2() {
  return (
    <div className="absolute h-[45px] left-[24px] overflow-clip top-[68px] w-[267.725px]" data-name="FacultyList">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[22.5px] left-0 text-[#101828] text-[18px] top-[-0.8px] w-[225px]">Teknik Informatika - Dasar Pemrograman</p>
    </div>
  );
}

function FacultyList3() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[121px] w-[267.725px]" data-name="FacultyList">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] top-[-1.2px] w-[240px]">Pengenalan logika pemrograman dan algoritma dasar menggunakan Python.</p>
    </div>
  );
}

function FacultyList4() {
  return (
    <div className="absolute content-stretch flex h-[32.788px] items-center justify-between left-[24px] pb-0 pt-[0.8px] px-0 top-[177px] w-[267.725px]" data-name="FacultyList">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.8px_0px_0px] border-solid inset-0 pointer-events-none" />
      <TextBackgroundImageAndText text="2 Catatan" />
      <TextBackgroundImageAndText1 text="Lihat" />
    </div>
  );
}

function CardContent() {
  return (
    <div className="absolute h-[233.788px] left-0 top-[8px] w-[315.725px]" data-name="CardContent">
      <FacultyList1 />
      <FacultyList2 />
      <FacultyList3 />
      <FacultyList4 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[243.387px] left-0 overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.325px]" data-name="Card">
      <FacultyList />
      <CardContent />
    </div>
  );
}

function FacultyList5() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList6() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.738px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="SI201" additionalClassNames="w-[49.788px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function FacultyList7() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[98.5px] w-[267.738px]" data-name="FacultyList">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] top-[-1.2px] w-[233px]">Analisis tegangan dan regangan pada material konstruksi.</p>
    </div>
  );
}

function CardContent1() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.738px]" data-name="CardContent">
      <FacultyList6 />
      <FacultyListBackgroundImageAndText text="Teknik Sipil - Mekanika Bahan" additionalClassNames="w-[267.738px]" />
      <FacultyList7 />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.738px]" />
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[243.387px] left-[337.33px] overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.337px]" data-name="Card">
      <FacultyList5 />
      <CardContent1 />
    </div>
  );
}

function FacultyList8() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList9() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.725px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="PE301" additionalClassNames="w-[52.987px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function FacultyList10() {
  return (
    <div className="absolute h-[45px] left-[24px] overflow-clip top-[68px] w-[267.725px]" data-name="FacultyList">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[22.5px] left-0 text-[#101828] text-[18px] top-[-0.8px] w-[253px]">Teknik Perminyakan - Geologi Minyak Bumi</p>
    </div>
  );
}

function FacultyList11() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[121px] w-[267.725px]" data-name="FacultyList">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] top-[-1.2px] w-[242px]">Pembentukan dan eksplorasi cadangan minyak bumi.</p>
    </div>
  );
}

function CardContent2() {
  return (
    <div className="absolute h-[233.788px] left-0 top-[8px] w-[315.725px]" data-name="CardContent">
      <FacultyList9 />
      <FacultyList10 />
      <FacultyList11 />
      <FacultyListBackgroundImage additionalClassNames="top-[177px] w-[267.725px]" />
    </div>
  );
}

function Card2() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[243.387px] left-[674.66px] overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.325px]" data-name="Card">
      <FacultyList8 />
      <CardContent2 />
    </div>
  );
}

function FacultyList12() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList13() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.725px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="MS401" additionalClassNames="w-[57.638px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function FacultyList14() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[98.5px] w-[267.725px]" data-name="FacultyList">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] top-[-1.2px] w-[207px]">Hukum dasar termodinamika dan aplikasinya pada mesin.</p>
    </div>
  );
}

function CardContent3() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.725px]" data-name="CardContent">
      <FacultyList13 />
      <FacultyListBackgroundImageAndText text="Teknik Mesin - Termodinamika" additionalClassNames="w-[267.725px]" />
      <FacultyList14 />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.725px]" />
    </div>
  );
}

function Card3() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-0 overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[263.39px] w-[317.325px]" data-name="Card">
      <FacultyList12 />
      <CardContent3 />
    </div>
  );
}

function FacultyList15() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList16() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.738px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="PWK501" additionalClassNames="w-[65.912px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function FacultyList17() {
  return (
    <div className="absolute h-[22.5px] left-[24px] overflow-clip top-[68px] w-[267.738px]" data-name="FacultyList">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[22.5px] left-0 text-[#101828] text-[18px] text-nowrap top-[-0.8px]">{`Perencanaan Wilayah & Kota`}</p>
    </div>
  );
}

function FacultyList18() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[98.5px] w-[267.738px]" data-name="FacultyList">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] top-[-1.2px] w-[245px]">Pengantar perencanaan tata ruang kota dan wilayah.</p>
    </div>
  );
}

function CardContent4() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.738px]" data-name="CardContent">
      <FacultyList16 />
      <FacultyList17 />
      <FacultyList18 />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.738px]" />
    </div>
  );
}

function Card4() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-[337.33px] overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[263.39px] w-[317.337px]" data-name="Card">
      <FacultyList15 />
      <CardContent4 />
    </div>
  );
}

function FacultyList19() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList20() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.725px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="GL601" additionalClassNames="w-[54.025px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function FacultyList21() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[98.5px] w-[267.725px]" data-name="FacultyList">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] top-[-1.2px] w-[202px]">Studi tentang batuan dan proses pembentukannya.</p>
    </div>
  );
}

function CardContent5() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.725px]" data-name="CardContent">
      <FacultyList20 />
      <FacultyListBackgroundImageAndText text="Teknik Geologi - Petrologi" additionalClassNames="w-[267.725px]" />
      <FacultyList21 />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.725px]" />
    </div>
  );
}

function Card5() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-[674.66px] overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[263.39px] w-[317.325px]" data-name="Card">
      <FacultyList19 />
      <CardContent5 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[484.275px] relative shrink-0 w-full" data-name="Container">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
      <Card4 />
      <Card5 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[549.875px] items-start relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[12px] h-[41.6px] items-center relative shrink-0 w-full" data-name="Container">
      <ContainerBackgroundImage />
      <HeadingBackgroundImageAndText text="Fakultas Hukum" additionalClassNames="w-[151.425px]" />
    </div>
  );
}

function FacultyList22() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList23() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.725px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="HK101" additionalClassNames="w-[54.075px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function FacultyList24() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[98.5px] w-[267.725px]" data-name="FacultyList">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] top-[-1.2px] w-[252px]">Konsep dasar, asas, dan sistem hukum di Indonesia.</p>
    </div>
  );
}

function CardContent6() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.725px]" data-name="CardContent">
      <FacultyList23 />
      <FacultyListBackgroundImageAndText text="Pengantar Ilmu Hukum" additionalClassNames="w-[267.725px]" />
      <FacultyList24 />
      <FacultyListBackgroundImage1 />
    </div>
  );
}

function Card6() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-0 overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.325px]" data-name="Card">
      <FacultyList22 />
      <CardContent6 />
    </div>
  );
}

function FacultyList25() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList26() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.738px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="HK102" additionalClassNames="w-[55.913px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function FacultyList27() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[98.5px] w-[267.738px]" data-name="FacultyList">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] top-[-1.2px] w-[222px]">Asas-asas hukum pidana dan tindak pidana.</p>
    </div>
  );
}

function CardContent7() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.738px]" data-name="CardContent">
      <FacultyList26 />
      <FacultyListBackgroundImageAndText text="Hukum Pidana" additionalClassNames="w-[267.738px]" />
      <FacultyList27 />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.738px]" />
    </div>
  );
}

function Card7() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-[337.33px] overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.337px]" data-name="Card">
      <FacultyList25 />
      <CardContent7 />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[220.887px] relative shrink-0 w-full" data-name="Container">
      <Card6 />
      <Card7 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[286.488px] items-start relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[12px] h-[41.6px] items-center relative shrink-0 w-full" data-name="Container">
      <ContainerBackgroundImage />
      <HeadingBackgroundImageAndText text="Fakultas Agama Islam (FAI)" additionalClassNames="w-[254.113px]" />
    </div>
  );
}

function FacultyList28() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList29() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.725px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="PAI101" additionalClassNames="w-[55.663px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function CardContent8() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.725px]" data-name="CardContent">
      <FacultyList29 />
      <FacultyListBackgroundImageAndText text="Pendidikan Agama Islam" additionalClassNames="w-[267.725px]" />
      <FacultyListBackgroundImageAndText1 text="Metodologi pengajaran agama Islam di sekolah." additionalClassNames="w-[267.725px]" />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.725px]" />
    </div>
  );
}

function Card8() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-0 overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.325px]" data-name="Card">
      <FacultyList28 />
      <CardContent8 />
    </div>
  );
}

function FacultyList30() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList31() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.738px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="SY201" additionalClassNames="w-[53.213px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function FacultyList32() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[98.5px] w-[267.738px]" data-name="FacultyList">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] top-[-1.2px] w-[214px]">Prinsip-prinsip hukum Islam dalam kehidupan sehari-hari.</p>
    </div>
  );
}

function CardContent9() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.738px]" data-name="CardContent">
      <FacultyList31 />
      <FacultyListBackgroundImageAndText text="Hukum Syariah" additionalClassNames="w-[267.738px]" />
      <FacultyList32 />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.738px]" />
    </div>
  );
}

function Card9() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-[337.33px] overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.337px]" data-name="Card">
      <FacultyList30 />
      <CardContent9 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[220.887px] relative shrink-0 w-full" data-name="Container">
      <Card8 />
      <Card9 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[286.488px] items-start relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[12px] h-[41.6px] items-center relative shrink-0 w-full" data-name="Container">
      <ContainerBackgroundImage />
      <HeadingBackgroundImageAndText text="Fakultas Ekonomi" additionalClassNames="w-[164.5px]" />
    </div>
  );
}

function FacultyList33() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList34() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.725px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="AK101" additionalClassNames="w-[53.313px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function FacultyList35() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[98.5px] w-[267.725px]" data-name="FacultyList">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] top-[-1.2px] w-[228px]">Siklus akuntansi perusahaan jasa dan dagang.</p>
    </div>
  );
}

function CardContent10() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.725px]" data-name="CardContent">
      <FacultyList34 />
      <FacultyListBackgroundImageAndText text="Pengantar Akuntansi" additionalClassNames="w-[267.725px]" />
      <FacultyList35 />
      <FacultyListBackgroundImage1 />
    </div>
  );
}

function Card10() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-0 overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.325px]" data-name="Card">
      <FacultyList33 />
      <CardContent10 />
    </div>
  );
}

function FacultyList36() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList37() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.738px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="MN201" additionalClassNames="w-[60.05px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function CardContent11() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.738px]" data-name="CardContent">
      <FacultyList37 />
      <FacultyListBackgroundImageAndText text="Manajemen Keuangan" additionalClassNames="w-[267.738px]" />
      <FacultyListBackgroundImageAndText1 text="Pengelolaan keuangan perusahaan dan investasi." additionalClassNames="w-[267.738px]" />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.738px]" />
    </div>
  );
}

function Card11() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-[337.33px] overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.337px]" data-name="Card">
      <FacultyList36 />
      <CardContent11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[220.887px] relative shrink-0 w-full" data-name="Container">
      <Card10 />
      <Card11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[286.488px] items-start relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[12px] h-[41.6px] items-center relative shrink-0 w-full" data-name="Container">
      <ContainerBackgroundImage />
      <HeadingBackgroundImageAndText text="Fakultas Psikologi" additionalClassNames="w-[168.262px]" />
    </div>
  );
}

function FacultyList38() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList39() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.725px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="PSI101" additionalClassNames="w-[54.975px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function FacultyList40() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[98.5px] w-[267.725px]" data-name="FacultyList">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] top-[-1.2px] w-[225px]">Pengantar dasar perilaku dan proses mental manusia.</p>
    </div>
  );
}

function CardContent12() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.725px]" data-name="CardContent">
      <FacultyList39 />
      <FacultyListBackgroundImageAndText text="Psikologi Umum" additionalClassNames="w-[267.725px]" />
      <FacultyList40 />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.725px]" />
    </div>
  );
}

function Card12() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-0 overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.325px]" data-name="Card">
      <FacultyList38 />
      <CardContent12 />
    </div>
  );
}

function FacultyList41() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList42() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.738px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="PSI201" additionalClassNames="w-[56.8px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function FacultyList43() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[98.5px] w-[267.738px]" data-name="FacultyList">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] top-[-1.2px] w-[248px]">Pertumbuhan manusia dari masa kanak-kanak hingga lansia.</p>
    </div>
  );
}

function CardContent13() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.738px]" data-name="CardContent">
      <FacultyList42 />
      <FacultyListBackgroundImageAndText text="Psikologi Perkembangan" additionalClassNames="w-[267.738px]" />
      <FacultyList43 />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.738px]" />
    </div>
  );
}

function Card13() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-[337.33px] overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.337px]" data-name="Card">
      <FacultyList41 />
      <CardContent13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[220.887px] relative shrink-0 w-full" data-name="Container">
      <Card12 />
      <Card13 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[286.488px] items-start relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[12px] h-[41.6px] items-center relative shrink-0 w-full" data-name="Container">
      <ContainerBackgroundImage />
      <HeadingBackgroundImageAndText text="Fakultas Ilmu Komunikasi (Fikom)" additionalClassNames="w-[317.813px]" />
    </div>
  );
}

function FacultyList44() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList45() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.725px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="KOM101" additionalClassNames="w-[64.975px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function CardContent14() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.725px]" data-name="CardContent">
      <FacultyList45 />
      <FacultyListBackgroundImageAndText text="Dasar-Dasar Komunikasi" additionalClassNames="w-[267.725px]" />
      <BackgroundImageAndText text="Teori dan model komunikasi antar manusia." additionalClassNames="w-[267.725px]" />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.725px]" />
    </div>
  );
}

function Card14() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-0 overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.325px]" data-name="Card">
      <FacultyList44 />
      <CardContent14 />
    </div>
  );
}

function FacultyList46() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList47() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.738px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="KOM201" additionalClassNames="w-[66.8px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function CardContent15() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.738px]" data-name="CardContent">
      <FacultyList47 />
      <FacultyListBackgroundImageAndText text="Jurnalistik Dasar" additionalClassNames="w-[267.738px]" />
      <BackgroundImageAndText text="Teknik peliputan dan penulisan berita." additionalClassNames="w-[267.738px]" />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.738px]" />
    </div>
  );
}

function Card15() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-[337.33px] overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.337px]" data-name="Card">
      <FacultyList46 />
      <CardContent15 />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[220.887px] relative shrink-0 w-full" data-name="Container">
      <Card14 />
      <Card15 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[286.488px] items-start relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[12px] h-[41.6px] items-center relative shrink-0 w-full" data-name="Container">
      <ContainerBackgroundImage />
      <HeadingBackgroundImageAndText text="Fakultas Ilmu Sosial dan Ilmu Politik (FISIPOL)" additionalClassNames="w-[431.138px]" />
    </div>
  );
}

function FacultyList48() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList49() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.725px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="IP101" additionalClassNames="w-[48.438px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function CardContent16() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.725px]" data-name="CardContent">
      <FacultyList49 />
      <FacultyListBackgroundImageAndText text="Pengantar Ilmu Politik" additionalClassNames="w-[267.725px]" />
      <FacultyListBackgroundImageAndText2 text="Konsep kekuasaan, negara, dan sistem pemerintahan." additionalClassNames="w-[267.725px]" />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.725px]" />
    </div>
  );
}

function Card16() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-0 overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.325px]" data-name="Card">
      <FacultyList48 />
      <CardContent16 />
    </div>
  );
}

function FacultyList50() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList51() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.738px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="SOS201" additionalClassNames="w-[61.9px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function FacultyList52() {
  return (
    <div className="absolute h-[40px] left-[24px] overflow-clip top-[98.5px] w-[267.738px]" data-name="FacultyList">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] top-[-1.2px] w-[200px]">Struktur sosial dan perubahan di masyarakat desa.</p>
    </div>
  );
}

function CardContent17() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.738px]" data-name="CardContent">
      <FacultyList51 />
      <FacultyListBackgroundImageAndText text="Sosiologi Pedesaan" additionalClassNames="w-[267.738px]" />
      <FacultyList52 />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.738px]" />
    </div>
  );
}

function Card17() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-[337.33px] overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.337px]" data-name="Card">
      <FacultyList50 />
      <CardContent17 />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[220.887px] relative shrink-0 w-full" data-name="Container">
      <Card16 />
      <Card17 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[286.488px] items-start relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[12px] h-[41.6px] items-center relative shrink-0 w-full" data-name="Container">
      <ContainerBackgroundImage />
      <HeadingBackgroundImageAndText text="Fakultas Pertanian" additionalClassNames="w-[172.637px]" />
    </div>
  );
}

function FacultyList53() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList54() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.725px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="AGR101" additionalClassNames="w-[61.675px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function CardContent18() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.725px]" data-name="CardContent">
      <FacultyList54 />
      <FacultyListBackgroundImageAndText text="Dasar Agronomi" additionalClassNames="w-[267.725px]" />
      <BackgroundImageAndText text="Prinsip budidaya tanaman pertanian." additionalClassNames="w-[267.725px]" />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.725px]" />
    </div>
  );
}

function Card18() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-0 overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.325px]" data-name="Card">
      <FacultyList53 />
      <CardContent18 />
    </div>
  );
}

function FacultyList55() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList56() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.738px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="TAN201" additionalClassNames="w-[62.763px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function CardContent19() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.738px]" data-name="CardContent">
      <FacultyList56 />
      <FacultyListBackgroundImageAndText text="Ilmu Tanah" additionalClassNames="w-[267.738px]" />
      <BackgroundImageAndText text="Sifat fisik dan kimia tanah untuk pertanian." additionalClassNames="w-[267.738px]" />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.738px]" />
    </div>
  );
}

function Card19() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-[337.33px] overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.337px]" data-name="Card">
      <FacultyList55 />
      <CardContent19 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[220.887px] relative shrink-0 w-full" data-name="Container">
      <Card18 />
      <Card19 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[286.488px] items-start relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Container24 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex gap-[12px] h-[41.6px] items-center relative shrink-0 w-full" data-name="Container">
      <ContainerBackgroundImage />
      <HeadingBackgroundImageAndText text="Fakultas Kedokteran Gigi (FKG)" additionalClassNames="w-[291.813px]" />
    </div>
  );
}

function FacultyList57() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList58() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.725px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="KG101" additionalClassNames="w-[53.175px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function CardContent20() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.725px]" data-name="CardContent">
      <FacultyList58 />
      <FacultyListBackgroundImageAndText text="Anatomi Gigi" additionalClassNames="w-[267.725px]" />
      <BackgroundImageAndText text="Struktur dan morfologi gigi manusia." additionalClassNames="w-[267.725px]" />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.725px]" />
    </div>
  );
}

function Card20() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-0 overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.325px]" data-name="Card">
      <FacultyList57 />
      <CardContent20 />
    </div>
  );
}

function FacultyList59() {
  return <div className="absolute bg-gradient-to-r from-[#00c950] h-[8px] left-0 to-[#00bc7d] top-0 w-0" data-name="FacultyList" />;
}

function FacultyList60() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-start justify-between left-[24px] top-[24px] w-[267.738px]" data-name="FacultyList">
      <BadgeBackgroundImageAndText text="PROF201" additionalClassNames="w-[69.225px]" />
      <ContainerBackgroundImage1 />
    </div>
  );
}

function CardContent21() {
  return (
    <div className="absolute h-[211.288px] left-0 top-[8px] w-[315.738px]" data-name="CardContent">
      <FacultyList60 />
      <FacultyListBackgroundImageAndText text="Etika Profesi Dokter Gigi" additionalClassNames="w-[267.738px]" />
      <FacultyListBackgroundImageAndText2 text="Kode etik dan standar profesionalisme dokter gigi." additionalClassNames="w-[267.738px]" />
      <FacultyListBackgroundImage additionalClassNames="top-[154.5px] w-[267.738px]" />
    </div>
  );
}

function Card21() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.8px] border-solid h-[220.887px] left-[337.33px] overflow-clip rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0 w-[317.337px]" data-name="Card">
      <FacultyList59 />
      <CardContent21 />
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[220.887px] relative shrink-0 w-full" data-name="Container">
      <Card20 />
      <Card21 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[286.488px] items-start relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <Container27 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] h-[3225.775px] items-start relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container7 />
      <Container10 />
      <Container13 />
      <Container16 />
      <Container19 />
      <Container22 />
      <Container25 />
      <Container28 />
    </div>
  );
}

function FacultyList61() {
  return (
    <div className="absolute bg-[rgba(249,250,251,0.5)] content-stretch flex flex-col gap-[40px] h-[3429.775px] items-start left-[53.6px] pb-0 pt-[64px] px-[16px] top-[795.6px] w-[1024px]" data-name="FacultyList">
      <Container1 />
      <Container29 />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <VectorBackgroundImage>
        <path d="M0.833333 0.833333V12.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </VectorBackgroundImage>
      <VectorBackgroundImage1>
        <path d={svgPaths.p1577d880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </VectorBackgroundImage1>
    </div>
  );
}

function Container30() {
  return (
    <ContainerBackgroundImage5 additionalClassNames="rounded-[10px] size-[36px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-full">
        <Icon />
      </div>
    </ContainerBackgroundImage5>
  );
}

function Text() {
  return (
    <div className="h-[28px] relative shrink-0 w-[78.85px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <BackgroundImageAndText1 text="UniNotes" additionalClassNames="leading-[28px] text-[18px] top-[-1.4px]" />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex gap-[8px] h-[36px] items-center relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Text />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[91px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[22.75px] left-0 text-[#6a7282] text-[14px] top-[-1.4px] w-[216px]">Platform berbagi catatan akademik terpercaya. Membantu mahasiswa belajar lebih efisien dengan materi yang terkurasi.</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[16px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <Container31 />
      <Paragraph />
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

function Container33() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[16px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <HeadingBackgroundImageAndText1 text="Eksplorasi" />
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

function Container34() {
  return (
    <div className="[grid-area:1_/_3] content-stretch flex flex-col gap-[16px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <HeadingBackgroundImageAndText1 text="Bantuan" />
      <List1 />
    </div>
  );
}

function Icon1() {
  return (
    <IconBackgroundImage4>
      <path d={svgPaths.p188b5880} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage4>
  );
}

function Link() {
  return (
    <LinkBackgroundImage>
      <Icon1 />
    </LinkBackgroundImage>
  );
}

function Icon2() {
  return (
    <BackgroundImage>
      <g clipPath="url(#clip0_2_862)" id="Icon">
        <path d={svgPaths.p4b98700} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p29b16f80} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M14.5833 5.41667H14.5917" id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
      <defs>
        <clipPath id="clip0_2_862">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </BackgroundImage>
  );
}

function Link1() {
  return (
    <LinkBackgroundImage>
      <Icon2 />
    </LinkBackgroundImage>
  );
}

function Icon3() {
  return (
    <IconBackgroundImage4>
      <path d={svgPaths.pe968880} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p5272800} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage4>
  );
}

function Link2() {
  return (
    <LinkBackgroundImage>
      <Icon3 />
    </LinkBackgroundImage>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex gap-[16px] h-[40px] items-start relative shrink-0 w-full" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
    </div>
  );
}

function Container36() {
  return (
    <div className="[grid-area:1_/_4] content-stretch flex flex-col gap-[16px] items-start place-self-stretch relative shrink-0" data-name="Container">
      <HeadingBackgroundImageAndText1 text="Ikuti Kami" />
      <Container35 />
    </div>
  );
}

function Container37() {
  return (
    <div className="gap-[32px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[156px] relative shrink-0 w-full" data-name="Container">
      <Container32 />
      <Container33 />
      <Container34 />
      <Container36 />
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

function Container38() {
  return (
    <div className="h-[20px] relative shrink-0 w-[246px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative size-full">
        <BackgroundImageAndText2 text="Kebijakan Privasi" additionalClassNames="w-[102.5px]" />
        <Link3 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex h-[52.8px] items-center justify-between pb-0 pt-[0.8px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0.8px_0px_0px] border-solid inset-0 pointer-events-none" />
      <BackgroundImageAndText2 text="© 2024 UniNotes. Dibuat oleh Mahasiswa." additionalClassNames="w-[260.837px]" />
      <Container38 />
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[336.8px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-start pb-0 pt-[48px] px-[16px] relative size-full">
          <Container37 />
          <Container39 />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[337.6px] items-start left-0 pb-0 pt-[0.8px] px-[53.6px] top-[4225.38px] w-[1131.2px]" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.8px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container40 />
    </div>
  );
}

function Container41() {
  return <div className="absolute bg-[#dcfce7] blur-3xl filter left-[827.2px] opacity-50 rounded-[2.68435e+07px] size-[384px] top-[-80px]" data-name="Container" />;
}

function Container42() {
  return <div className="absolute bg-[#d0fae5] blur-3xl filter left-[-80px] opacity-50 rounded-[2.68435e+07px] size-[288px] top-[523.6px]" data-name="Container" />;
}

function Icon4() {
  return (
    <IconBackgroundImage5 additionalClassNames="left-[12px] top-[6px]">
      <g clipPath="url(#clip0_2_826)" id="Icon">
        <path d={svgPaths.p319d7580} id="Vector" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M13.3333 2V4.66667" id="Vector_2" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M14.6667 3.33333H12" id="Vector_3" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M2.66667 11.3333V12.6667" id="Vector_4" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M3.33333 12H2" id="Vector_5" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      </g>
      <defs>
        <clipPath id="clip0_2_826">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </IconBackgroundImage5>
  );
}

function Text1() {
  return (
    <div className="absolute h-[20px] left-[36px] top-[4px] w-[232.838px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[116.5px] text-[#008236] text-[14px] text-center text-nowrap top-[-1.2px] translate-x-[-50%]">Platform Berbagi Catatan #1 Kampus</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#dcfce7] border-[0.8px] border-solid h-[29.6px] left-[306.77px] rounded-[2.68435e+07px] top-0 w-[282.438px]" data-name="Container">
      <Icon4 />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute content-stretch flex h-[96px] items-start left-[263.01px] top-[70.4px] w-[369.975px]" data-name="Text">
      <p className="bg-clip-text font-['Arimo:Bold',sans-serif] font-bold leading-[79.2px] relative shrink-0 text-[72px] text-[rgba(0,0,0,0)] text-center text-nowrap tracking-[-1.8px]" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(0, 166, 62) 0%, rgb(0, 153, 102) 100%)" }}>
        Ada Di Sini.
      </p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[158.4px] left-0 top-[53.6px] w-[896px]" data-name="Heading 1">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[79.2px] left-[447.55px] text-[#101828] text-[72px] text-center text-nowrap top-[-7.8px] tracking-[-1.8px] translate-x-[-50%]">Catatan Kuliah Terbaik</p>
      <Text2 />
    </div>
  );
}

function Text3() {
  return <div className="absolute h-[32px] left-[141.52px] top-[42.2px] w-[508.563px]" data-name="Text" />;
}

function Paragraph1() {
  return (
    <div className="absolute h-[78px] left-[112px] top-[236px] w-[672px]" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[39px] left-[333.9px] text-[#6a7282] text-[24px] text-center top-[-2.8px] translate-x-[-50%] w-[624px]">Akses ribuan ringkasan, slide, dan materi ujian dari sesama mahasiswa.</p>
      <Text3 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <VectorBackgroundImage>
        <path d="M0.833333 0.833333V12.5" id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </VectorBackgroundImage>
      <VectorBackgroundImage1>
        <path d={svgPaths.p1577d880} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </VectorBackgroundImage1>
    </div>
  );
}

function Container44() {
  return (
    <ContainerBackgroundImage2>
      <Icon5 />
    </ContainerBackgroundImage2>
  );
}

function Container45() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText text="500+" />
      <ParagraphBackgroundImageAndText1 text="Mata Kuliah" />
    </ContainerBackgroundImage3>
  );
}

function Container46() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[36px] items-center left-[294.38px] top-0 w-[124.725px]" data-name="Container">
      <Container44 />
      <Container45 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[62.5%_33.33%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 6.66667">
            <path d={svgPaths.p6877e0} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_45.83%_54.17%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33333 8.33333">
            <path d={svgPaths.p3ffa2780} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[63.04%_8.33%_12.5%_79.17%]" data-name="Vector">
        <div className="absolute inset-[-17.04%_-33.33%_-17.04%_-33.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.16687 6.55854">
            <path d={svgPaths.p39df7200} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[13.04%_20.8%_54.67%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-12.91%_-33.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.1734 8.1254">
            <path d={svgPaths.p159fd500} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <ContainerBackgroundImage2>
      <Icon6 />
    </ContainerBackgroundImage2>
  );
}

function Container48() {
  return (
    <ContainerBackgroundImage3>
      <ParagraphBackgroundImageAndText text="2.5k+" />
      <ParagraphBackgroundImageAndText1 text="Mahasiswa" />
    </ContainerBackgroundImage3>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[36px] items-center left-[483.1px] top-0 w-[118.513px]" data-name="Container">
      <Container47 />
      <Container48 />
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute h-[36px] left-0 top-[471.6px] w-[896px]" data-name="Container">
      <Container46 />
      <Container49 />
    </div>
  );
}

function Container51() {
  return <div className="absolute bg-[#00a63e] blur filter h-[69.6px] left-0 opacity-20 rounded-[2.68435e+07px] top-0 w-[672px]" data-name="Container" />;
}

function Icon7() {
  return (
    <div className="absolute left-[24px] size-[24px] top-[22px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p19568f00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M21 21L16.7 16.7" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute content-stretch flex h-[52px] items-center left-[48px] overflow-clip px-[16px] py-[12px] top-[8px] w-[522px]" data-name="Text Input">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#99a1af] text-[18px] text-nowrap">Cari mata kuliah, kode, atau materi...</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#00a63e] content-stretch flex h-[48px] items-center justify-center left-[570px] px-[32px] py-[8px] rounded-[2.68435e+07px] top-[10px] w-[92.4px]" data-name="Button">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-center text-nowrap text-white">Cari</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute bg-white border-[#f3f4f6] border-[0.8px] border-solid h-[69.6px] left-0 rounded-[2.68435e+07px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-0 w-[672px]" data-name="Container">
      <Icon7 />
      <TextInput />
      <Button />
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute h-[69.6px] left-[112px] top-[354px] w-[672px]" data-name="Container">
      <Container51 />
      <Container52 />
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute h-[507.6px] left-[117.6px] top-[96px] w-[896px]" data-name="Container">
      <Container43 />
      <Heading />
      <Paragraph1 />
      <Container50 />
      <Container53 />
    </div>
  );
}

function Hero() {
  return (
    <div className="absolute bg-white h-[731.6px] left-0 overflow-clip top-[64px] w-[1131.2px]" data-name="Hero">
      <Container41 />
      <Container42 />
      <Container54 />
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-[#f9fafb] h-[4562.975px] left-0 top-0 w-[1131.2px]" data-name="App">
      <FacultyList61 />
      <Footer />
      <Hero />
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/2 right-1/2 top-[29.17%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 16">
            <path d="M1 1V15" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 20">
            <path d={svgPaths.p7170bc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <ContainerBackgroundImage5 additionalClassNames="rounded-[14px] shadow-[0px_10px_15px_-3px_#b9f8cf,0px_4px_6px_-4px_#b9f8cf] size-[44px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[10px] px-[10px] relative size-full">
        <Icon8 />
      </div>
    </ContainerBackgroundImage5>
  );
}

function Text4() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[90.888px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <BackgroundImageAndText1 text="UniNotes" additionalClassNames="leading-[20px] text-[20px] top-[-2.2px]" />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[15px] relative shrink-0 w-[90.888px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#6a7282] text-[10px] text-nowrap top-[-1.2px] tracking-[0.5px] uppercase">Academic Share</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[37px] relative shrink-0 w-[90.888px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Text4 />
        <Text5 />
      </div>
    </div>
  );
}

function Container57() {
  return (
    <ContainerBackgroundImage4 additionalClassNames="h-[44px] w-[146.887px]">
      <Container55 />
      <Container56 />
    </ContainerBackgroundImage4>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[141.95px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] text-nowrap top-[-1.2px]">Ingin berbagi catatan?</p>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <IconBackgroundImage5 additionalClassNames="left-[16px] top-[12px]">
      <g id="Icon">
        <path d={svgPaths.pc444e40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d={svgPaths.p28e93fc0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M10 8H2" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      </g>
    </IconBackgroundImage5>
  );
}

function Button1() {
  return (
    <div className="bg-[#101828] h-[40px] relative rounded-[8px] shadow-[0px_10px_15px_-3px_#e5e7eb,0px_4px_6px_-4px_#e5e7eb] shrink-0 w-[134.738px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon9 />
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[79.5px] text-[14px] text-center text-nowrap text-white top-[8.8px] translate-x-[-50%]">Masuk Akun</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <ContainerBackgroundImage4 additionalClassNames="h-[40px] w-[288.688px]">
      <Text6 />
      <Button1 />
    </ContainerBackgroundImage4>
  );
}

function Container59() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-0 relative size-full">
          <Container57 />
          <Container58 />
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex flex-col h-[60.8px] items-start left-0 pb-[0.8px] pt-[8px] px-[53.6px] top-[1500px] w-[1131.2px]" data-name="Navbar">
      <div aria-hidden="true" className="absolute border-[#b9f8cf] border-[0px_0px_0.8px] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Container59 />
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="bg-white relative size-full" data-name="Dashboard">
      <App />
      <Navbar />
    </div>
  );
}
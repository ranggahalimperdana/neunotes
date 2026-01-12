import svgPaths from "./svg-x1ywcx9jen";
import clsx from "clsx";
type ContainerBackgroundImageProps = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImageProps>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">{children}</div>
    </div>
  );
}

function Icon6VectorBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-1/4">
      <div className="absolute inset-[-8.33%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
          {children}
        </svg>
      </div>
    </div>
  );
}

function IconBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText({ text, additionalClassNames = "" }: BackgroundImageAndTextProps) {
  return (
    <div className={clsx("content-stretch flex items-center overflow-clip py-[8px] relative rounded-[inherit] size-full", additionalClassNames)}>
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#717182] text-[14px] text-nowrap">{text}</p>
    </div>
  );
}

function Icon() {
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

function Container() {
  return (
    <div className="relative rounded-[14px] shadow-[0px_10px_15px_-3px_#b9f8cf,0px_4px_6px_-4px_#b9f8cf] shrink-0 size-[44px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 166, 62) 0%, rgb(0, 122, 85) 100%)" }}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[10px] px-[10px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[90.888px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute bg-clip-text font-['Arimo:Bold',sans-serif] font-bold leading-[20px] left-0 text-[20px] text-[rgba(0,0,0,0)] text-nowrap top-[-2.2px]" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(0, 130, 54) 0%, rgb(0, 122, 85) 100%)" }}>
          UniNotes
        </p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[15px] relative shrink-0 w-[90.888px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[15px] left-0 text-[#6a7282] text-[10px] text-nowrap top-[-1.2px] tracking-[0.5px] uppercase">Academic Share</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[37px] relative shrink-0 w-[90.888px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Text />
        <Text1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <ContainerBackgroundImage additionalClassNames="h-[44px] w-[146.887px]">
      <Container />
      <Container1 />
    </ContainerBackgroundImage>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[141.95px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] text-nowrap top-[-1.2px]">Ingin berbagi catatan?</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pc444e40} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28e93fc0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 8H2" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#101828] h-[40px] relative rounded-[8px] shadow-[0px_10px_15px_-3px_#e5e7eb,0px_4px_6px_-4px_#e5e7eb] shrink-0 w-[134.738px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon1 />
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[79.5px] text-[14px] text-center text-nowrap text-white top-[8.8px] translate-x-[-50%]">Masuk Akun</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <ContainerBackgroundImage additionalClassNames="h-[40px] w-[288.688px]">
      <Text2 />
      <Button />
    </ContainerBackgroundImage>
  );
}

function Container4() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-0 relative size-full">
          <Container2 />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[76.8px] items-start left-0 pb-[0.8px] pt-[16px] px-[53.6px] top-0 w-[1131.2px]" data-name="Navbar">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
      <Container4 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_12.5%_12.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 26.6667">
            <path d={svgPaths.p775f700} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_37.5%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-10%_-20%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 16">
            <path d={svgPaths.p3c2ed700} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[12.5%] right-[37.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-1.33px_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.6667 2.66667">
            <path d="M17.3333 1.33333H1.33333" id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LoginModal() {
  return (
    <div className="absolute bg-[#dcfce7] content-stretch flex flex-col items-start left-[196px] pb-0 pt-[12px] px-[12px] rounded-[2.68435e+07px] size-[56px] top-[24px]" data-name="LoginModal">
      <Icon2 />
    </div>
  );
}

function CardTitle() {
  return (
    <div className="absolute content-stretch flex h-[31.988px] items-start left-[24px] top-[96px] w-[400px]" data-name="CardTitle">
      <p className="basis-0 font-['Arimo:Bold',sans-serif] font-bold grow leading-[32px] min-h-px min-w-px relative shrink-0 text-[#101828] text-[24px] text-center tracking-[-0.6px]">Selamat Datang</p>
    </div>
  );
}

function CardDescription() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[131.99px] w-[400px]" data-name="CardDescription">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[200.17px] text-[#717182] text-[16px] text-center text-nowrap top-[-2.2px] translate-x-[-50%]">Masuk untuk mulai berbagi dan mengunduh catatan</p>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="absolute h-[163.988px] left-0 top-0 w-[448px]" data-name="CardHeader">
      <LoginModal />
      <CardTitle />
      <CardDescription />
    </div>
  );
}

function PrimitiveLabel() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-start left-0 top-[3.2px] w-[97.575px]" data-name="Primitive.label">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#364153] text-[14px] text-nowrap">Email atau NIM</p>
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-[#f9fafb] h-[44px] left-0 rounded-[8px] top-0 w-[400px]" data-name="Input">
      <BackgroundImageAndText text="Contoh: 12345678" additionalClassNames="pl-[40px] pr-[12px]" />
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon3() {
  return (
    <IconBackgroundImage>
      <path d={svgPaths.p1beb9580} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p32ab0300} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex h-[44px] items-center left-0 pl-[12px] pr-0 py-0 top-0 w-[32px]" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[44px] left-0 top-[24px] w-[400px]" data-name="Container">
      <Input />
      <Container5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[68px] relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel />
      <Container6 />
    </div>
  );
}

function PrimitiveLabel1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[67.275px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#364153] text-[14px] text-nowrap top-[-1.2px]">Kata Sandi</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[62.237px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#00a63e] text-[12px] text-nowrap">Lupa sandi?</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <PrimitiveLabel1 />
          <Link />
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="absolute bg-[#f9fafb] h-[44px] left-0 rounded-[8px] top-0 w-[400px]" data-name="Input">
      <BackgroundImageAndText text="Masukkan kata sandi..." additionalClassNames="px-[40px]" />
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon4() {
  return (
    <IconBackgroundImage>
      <path d={svgPaths.p2566d000} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p1bf79e00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex h-[44px] items-center left-0 pl-[12px] pr-0 py-0 top-0 w-[32px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Icon5() {
  return (
    <IconBackgroundImage>
      <path d={svgPaths.p25dc7400} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p3b27f100} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex h-[44px] items-center left-[368px] top-0 w-[32px]" data-name="Button">
      <Icon5 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Container9 />
      <Button1 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[72px] items-start relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container10 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#00a63e] h-[44px] relative rounded-[8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[200.8px] text-[16px] text-center text-nowrap text-white top-[7.8px] translate-x-[-50%]">Masuk Sekarang</p>
    </div>
  );
}

function LoginModal1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[224px] items-start left-[24px] top-[187.99px] w-[400px]" data-name="LoginModal">
      <Container7 />
      <Container11 />
      <Button2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-start left-[124.41px] top-[0.8px] w-[81.3px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#00a63e] text-[14px] text-center text-nowrap">Daftar di sini</p>
    </div>
  );
}

function LoginModal2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[205.713px]" data-name="LoginModal">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[62px] text-[#6a7282] text-[14px] text-center text-nowrap top-[-1.2px] translate-x-[-50%]">Belum punya akun?</p>
        <Text3 />
      </div>
    </div>
  );
}

function CardFooter() {
  return (
    <div className="absolute bg-[rgba(249,250,251,0.5)] content-stretch flex flex-col h-[68px] items-center left-0 px-0 py-[24px] rounded-bl-[10px] rounded-br-[10px] top-[435.99px] w-[448px]" data-name="CardFooter">
      <LoginModal2 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon6VectorBackgroundImage>
        <path d={svgPaths.p354ab980} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon6VectorBackgroundImage>
      <Icon6VectorBackgroundImage>
        <path d={svgPaths.p2a4db200} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon6VectorBackgroundImage>
    </div>
  );
}

function LoginModal3() {
  return (
    <div className="absolute bg-[#f3f4f6] content-stretch flex flex-col items-start left-[404px] pb-0 pt-[4px] px-[4px] rounded-[2.68435e+07px] size-[28px] top-[16px]" data-name="LoginModal">
      <Icon6 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-white h-[503.988px] left-[341.6px] rounded-[10px] shadow-[0px_0px_0px_1px_#e5e7eb,0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-[111.6px] w-[448px]" data-name="Card">
      <CardHeader />
      <LoginModal1 />
      <CardFooter />
      <LoginModal3 />
    </div>
  );
}

function LoginModal4() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.6)] h-[727.2px] left-0 top-0 w-[1131.2px]" data-name="LoginModal">
      <Card />
    </div>
  );
}

export default function Login() {
  return (
    <div className="bg-white relative size-full" data-name="Login">
      <Navbar />
      <LoginModal4 />
    </div>
  );
}

import "./Profile.css";
export const Profile = ()=>{
    return <ProfileVip/>
}
//IMPORTANT NOTE: TO UNDERSTAND HOW THINGS LIKE TEXT IMPORTS WORK, READ THE README

export default function ProfileVip() {
  return (
    <div className="profile-vip-container">
      <div className="profileVip1">
        <div className="group95">
          <div className="rectangle19"></div>
          <div className="group96">
            <div className="profile2">
              <div className="profile3">
                <div className="frame67">
                  <div className="group97">
                    <Avatar variant="FIREJET_VARIANT2"></Avatar>
                    <div className="frame68">
                      <div className="image4"></div>
                    </div>
                    <div className="pngtreeAvatarFrame_56329102"></div>
                  </div>
                </div>
                <VIP variant="FIREJET_VARIANT"></VIP>
                <p className="myClass11">Затишье</p>
              </div>
              <p className="myClass12">
               lorem ipsum
                <br />
                Lorem Ipsum is simply dummy text 
              </p>
            </div>
            <div className="group98">
              <p className="myClass13">В составе команд</p>
              <div className="frame69">
                <Frame51></Frame51>
                <Frame51 variant="FIREJET_VARIANT"></Frame51>
                <Frame51 variant="FIREJET_VARIANT1"></Frame51>
              </div>
            </div>
          </div>
          <div className="rectangle20"></div>
        </div>
        <div className="frame72">
          <MdiPencil></MdiPencil>
          <p className="myClass14">Редактировать</p>
        </div>
        <div className="profile-vip-container1">
          <div className="frame73">
            <div className="frame74">
              <div className="group99">
                <div className="rectangle21"></div>
                <div className="rectangle22"></div>
                <div className="group100">
                  <div className="group101">
                    <div className="elHome"></div>
                  </div>
                  <p className="myClass15">Главная</p>
                </div>
              </div>
              <div className="group102">
                <div className="rectangle21"></div>
                <div className="rectangle22"></div>
                <div className="group103">
                  <div className="cilSearch"></div>
                  <p className="myClass16">Поиск</p>
                </div>
              </div>
              <div className="group104">
                <div className="rectangle21"></div>
                <div className="rectangle22"></div>
                <div className="profile-vip-container2">
                  <div className="biBookmark1">
                    <div className="group105"></div>
                  </div>
                </div>
                <p className="myClass17">Закладки</p>
              </div>
              <div className="group106">
                <div className="rectangle21"></div>
                <div className="menu1">
                  <div className="rectangle23"></div>
                  <div className="rectangle23"></div>
                  <div className="rectangle24"></div>
                </div>
                <p className="myClass18">Меню</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProfileVip.defaultProps = {
  variant: "DEFAULT",
};

interface ProfileVipInterface {
  variant: "DEFAULT";
}

export function Avatar(props: AvatarInterface) {
  return (
    <>
      {props.variant === "FIREJET_NONE" && <Group1></Group1>}
      {props.variant === "FIREJET_NONE" && <div className="rectangle16"></div>}
      {props.variant === "FIREJET_VARIANT" && (
        <div className="avatar8">
          <div className="rectangle17"></div>
        </div>
      )}
      {props.variant === "FIREJET_VARIANT1" && (
        <div className="avatar8">
          <Group3></Group3>
          <div className="rectangle18"></div>
        </div>
      )}
      {props.variant === "FIREJET_VARIANT2" && (
        <div className="avatar9">
          <Group1></Group1>
        </div>
      )}
    </>
  );
}

Avatar.defaultProps = {
  variant: "FIREJET_NONE",
};

interface AvatarInterface {
  variant:
    | "FIREJET_NONE"
    | "FIREJET_VARIANT"
    | "FIREJET_VARIANT1"
    | "FIREJET_VARIANT2";
}

export function VIP(props: VIPInterface) {
  return (
    <>
      {props.variant === "FIREJET_NONE" && <p className="vIP6">VIP</p>}
      {props.variant === "FIREJET_VARIANT" && (
        <div className="vIP7">
          <p className="vIP8">VIP</p>
        </div>
      )}
    </>
  );
}

VIP.defaultProps = {
  variant: "FIREJET_NONE",
};

interface VIPInterface {
  variant: "FIREJET_NONE" | "FIREJET_VARIANT";
}

export function Frame51(props: Frame51Interface) {
  return (
    <>
      {props.variant === "FIREJET_NONE" && <Frame51></Frame51>}
      {props.variant === "FIREJET_NONE" && (
        <p className="calmStasis3">Calm Stasis</p>
      )}
      {props.variant === "FIREJET_VARIANT" && (
        <div className="frame65">
          <Frame51></Frame51>
          <p className="calmStasis4">Длинное название</p>
        </div>
      )}
      {props.variant === "FIREJET_VARIANT1" && (
        <div className="frame66">
          <Frame51></Frame51>
          <p className="calmStasis5">Calm Stasis</p>
        </div>
      )}
    </>
  );
}

Frame51.defaultProps = {
  variant: "FIREJET_NONE",
};

interface Frame51Interface {
  variant: "FIREJET_NONE" | "FIREJET_VARIANT" | "FIREJET_VARIANT1";
}
// 
export function Group1(props: Group2Interface) {
  return (
    <div className="group107">
      <div className="group107">
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <mask
            id="mask0_138_376"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="40"
            height="40"
          >
            <rect
              x="1"
              y="1"
              width="38"
              height="38"
              rx="19"
              fill="#C4C4C4"
              stroke="#580404"
              strokeWidth="2"
            ></rect>
          </mask>
          <g mask="url(#mask0_138_376)">
            <rect width="40" height="40" rx="20" fill="url(#pattern0)"></rect>
          </g>
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlinkHref="#image0_138_376"
                transform="translate(-0.194444 -0.319444) scale(0.00174074)"
              ></use>
            </pattern>
            
          </defs>
        </svg>
      </div>
    </div>
  );
}

interface Group2Interface {}

export function Group3(props: Group2Interface) {
  return (
    <div className="group108">
      <div className="group108">
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <mask
            id="mask0_604_193"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="40"
            height="40"
          >
            <rect
              x="1"
              y="1"
              width="38"
              height="38"
              rx="19"
              fill="#C4C4C4"
              stroke="#580404"
              strokeWidth="2"
            ></rect>
          </mask>
          <g mask="url(#mask0_604_193)">
            <rect width="40" height="40" rx="20" fill="url(#pattern0)"></rect>
          </g>
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlinkHref="#image0_604_193"
                transform="translate(-0.194444 -0.319444) scale(0.00174074)"
              ></use>
            </pattern>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export function MdiPencil() {
  return (
    <div className="mdiPencil1">
      <div className="mdiPencil1">
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.1601 5.06189C13.3912 4.83082 13.3912 4.44568 13.1601 4.22646L11.7736 2.83998C11.5544 2.6089 11.1693 2.6089 10.9382 2.83998L9.84797 3.92427L12.0699 6.14619L13.1601 5.06189ZM2.66675 11.1114V13.3333H4.88866L11.4418 6.77425L9.21991 4.55234L2.66675 11.1114Z"
            fill="#111111"
          ></path>
        </svg>
      </div>
    </div>
  );
}

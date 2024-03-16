'use client'
import { i18nextInstance } from "@/app/shared/lib/i18n/client";
import { Avatar,Text, Combobox, Flex, InputBase, useCombobox } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";

const supportedLanguages = [{
    lng: 'English',
    value: 'en',
    image: '/lng/en.png',   
}, 
{
    lng: 'Русский',
    value: 'ru',
    image: '/lng/ru.png',
}]


export const LanguagePicker = ({currentLng}:{currentLng:string})=>{

    const path = usePathname()
    const router = useRouter()

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const options = supportedLanguages.map((lng) => {
        return (
            <Flex gap={8} w='auto' align='center' component={Combobox.Option} value={lng.value} key={lng.value}>
                <Avatar size='sm' src={lng.image} />
                <Text>{lng.lng}</Text>
            </Flex>
        )
    });

    const selectedLanguage = supportedLanguages.find((lng => (lng.value === currentLng))) 

    return (
        <Combobox
                    store={combobox} onOptionSubmit={(val) => {
                        
                        i18nextInstance.changeLanguage(val)
                        router.push(path.replace(currentLng, val))
                        combobox.closeDropdown();
                    }}>
                    <Combobox.Target>
                        <InputBase
                            miw={200}
                            // styles={{ input: { minHeight: 40 } }}
                            aria-label="Language"
                            component="button"
                            type="button"
                            pointer
                            leftSection={<Flex justify='center' align='center'><Avatar size='sm' src={selectedLanguage?.image} /></Flex>}

                            rightSection={<Combobox.Chevron />}
                            rightSectionPointerEvents="none"
                            onFocus={() => combobox.openDropdown()}
                            onClick={() => combobox.toggleDropdown()}
                        >
                            {selectedLanguage?.lng}
                        </InputBase>
                    </Combobox.Target>
                    <Combobox.Dropdown>
                        <Combobox.Options>{options}</Combobox.Options>
                    </Combobox.Dropdown>
                </Combobox>
    )
}
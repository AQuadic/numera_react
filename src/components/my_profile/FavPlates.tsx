import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

const FavPlates = () => {
    return (
        <section className="py-12">
            <h2 className="text-[#192540] text-2xl font-medium">Favorite</h2>
            <Tabs
                    className="flex items-center justify-center mt-8 bg-[#FDFAF3] rounded-[74px] h-[74px]"
                    >
                    <TabsList className="bg-transparent flex items-center justify-center mt-13 md:gap-[68px] mb-12">
                        <TabsTrigger value="plates" className="lg:w-[494px] w-full">Plates</TabsTrigger>
                        <TabsTrigger value="phone_number" className="lg:w-[494px] w-full">Phone Number</TabsTrigger>
                    </TabsList>
                    <TabsContent value="plates">
                            
                    </TabsContent>
                    <TabsContent value="phone_number">
                        
                    </TabsContent>
                </Tabs>
        </section>
    )
}

export default FavPlates

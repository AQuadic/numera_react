import PlateCard from "../components/home/PlateCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

const PlatesFilter = () => {
    return (
        <section className="container md:py-[58px]">
            <Tabs defaultValue="all" className="flex items-center justify-center">
                    <TabsList className=" w-full rounded-[74px] bg-[#FDFAF3] gap-[68px] px-8 py-10">
                        <TabsTrigger value="all">All Plates</TabsTrigger>
                        <TabsTrigger value="premium">Premium</TabsTrigger>
                        <TabsTrigger value="sold">Sold</TabsTrigger>
                        <TabsTrigger value="vip">VIP Numbers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <PlateCard />
                            <PlateCard />
                            <PlateCard />
                            <PlateCard />
                            <PlateCard />
                            <PlateCard />
                            <PlateCard />
                            <PlateCard />
                        </div>
                    </TabsContent>
                    <TabsContent value="premium" className="mt-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <PlateCard />
                            <PlateCard />
                            <PlateCard />
                        </div>
                    </TabsContent>
                    <TabsContent value="sold" className="mt-10">
                        Sold
                    </TabsContent>
                    <TabsContent value="vip" className="mt-10">
                        vip
                    </TabsContent>
                </Tabs>
        </section>
    )
}

export default PlatesFilter

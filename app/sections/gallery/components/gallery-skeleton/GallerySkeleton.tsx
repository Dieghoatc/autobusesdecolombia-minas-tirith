import { Skeleton } from '@/app/components/ui/skeleton'
import styles from './GallerySkeleton.module.css'

const items = Array.from({length: 8})

export function GallerySkeleton() {
    return (
        <section className={styles.container}>
            {items.map((_, index) => (
                <article key={index}>
                    <Skeleton className={styles.item} />
                </article>
            ))}
        </section>
    )
}